import { GraphQLError } from "graphql";
import { v4 } from "uuid";

let Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args;
    if (typeof name !== "string") {
      throw new Error("Name can not be empty");
    }
    if (typeof age !== "number") {
      throw new Error("Age can not be empty");
    }

    let newUser = {
      id: v4(),
      name,
      age,
    };

    db.users.push(newUser);
    return newUser;
  },
  createPost: (parent, args, { db }, info) => {
    const { title, body, authorId } = args.data;

    const position = db.users.findIndex((user) => user.id === authorId);

    if (position === -1) {
      throw new GraphQLError("Unable to locate user for id -" + authorId);
    }

    let newPost = {
      id: v4(),
      title,
      body,
      author: authorId,
      published: false,
    };

    db.posts.push(newPost);
    return newPost;
  },
  createComment: (parent, args, { db }, info) => {
    const { text, postId, creatorId } = args.data;
    const userPosition = db.users.findIndex((user) => user.id === creatorId);
    if (userPosition === -1) {
      throw new GraphQLError("Unable to find creator for id - " + creatorId);
    }
    const postPosition = db.posts.findIndex((post) => post.id === postId);
    if (postPosition === -1) {
      throw new GraphQLError("Unable to find post for id - " + postId);
    }

    let newComment = {
      id: v4(),
      text,
      postId,
      creator: creatorId,
    };
    db.comments.push(newComment);
    return newComment;
  },
  deleteComment: (parent, args, { db }, info) => {
    const position = db.comments.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (position === -1) {
      throw new GraphQLError(
        "Unable to find comment for id - " + args.commentId
      );
    }
    const [deletedComment] = db.comments.splice(position, 1);
    return deletedComment;
  },
  deletePost: (parent, args, { db }, info) => {
    const position = db.posts.findIndex((post) => post.id === args.postId);

    if (position === -1) {
      throw new GraphQLError("Unable to delete post for id - " + args.postId);
    }

    db.comments = db.comments.filter(
      (comment) => comment.postId !== args.postId
    );
    const [deletedPost] = db.posts.splice(position, 1);
    return deletedPost;
  },
  deleteUser: (parent, args, { db }, info) => {
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete user for id - " + args.userId);
    }
    db.posts = db.posts.filter((post) => {
      const isMatched = post.author === args.userId;

      if (isMatched) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return !isMatched;
    });

    db.comments = db.comments.filter(
      (comment) => comment.creator !== args.userId
    );

    const [deletedUser] = db.users.splice(position, 1);

    return deletedUser;
  },
  updateUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError(
        "Unable to update the user for id - " + args.userId
      );
    }
    if (typeof name === "string") {
      db.users[position].name = name;
    }
    if (typeof age === "number") {
      db.users[position].age = age;
    }
    return db.users[position];
  },
};

export default Mutation;
