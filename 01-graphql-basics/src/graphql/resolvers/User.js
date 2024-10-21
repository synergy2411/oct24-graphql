let User = {
  posts: (parent, args, { db }, into) => {
    return db.posts.filter((post) => post.author === parent.id);
  },
  comments: (parent, args, { db }, into) => {
    return db.comments.filter((comment) => comment.creator === parent.id);
  },
};

export default User;
