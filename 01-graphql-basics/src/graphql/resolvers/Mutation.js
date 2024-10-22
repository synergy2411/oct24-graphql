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
};

export default Mutation;
