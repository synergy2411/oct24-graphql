let Query = {
  users: (parent, args, { db }, info) => {
    if (args.searchTerm) {
      return db.users.filter((user) =>
        user.name.toLowerCase().includes(args.searchTerm.toLowerCase())
      );
    }
    return db.users;
  },
  posts: (parent, args, { db }, info) => {
    if (args.searchTerm) {
      return db.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.searchTerm) ||
          post.body.toLowerCase().includes(args.searchTerm)
      );
    }
    return db.posts;
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
};

export default Query;
