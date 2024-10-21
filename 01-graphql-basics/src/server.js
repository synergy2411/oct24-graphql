import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const PORT = 4040;

const users = [
  { id: "u001", name: "monica", age: 22 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 21 },
];

const posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "I love it❤️❤️",
    published: false,
    author: "u003",
  },
  {
    id: "p002",
    title: "NodeJS for Beginners",
    body: "I like it",
    published: true,
    author: "u002",
  },
  {
    id: "p003",
    title: "Refresh React",
    body: "Not bad",
    published: false,
    author: "u003",
  },
  {
    id: "p004",
    title: "Advanced of Angular",
    body: "for advance peeps",
    published: true,
    author: "u001",
  },
];
const comments = [
  {
    id: "c001",
    text: "all good",
  },
  {
    id: "c001",
    text: "very well",
  },
  {
    id: "c001",
    text: "nothing. just like that",
  },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(searchTerm: String): [User!]!
    posts(searchTerm: String): [Post!]!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
  type Comment {
    id: ID!
    text: String!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (args.searchTerm) {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      }
      return users;
    },
    posts: (parent, args, context, info) => {
      if (args.searchTerm) {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.searchTerm) ||
            post.body.toLowerCase().includes(args.searchTerm)
        );
      }
      return posts;
    },
    comments: (parent, args, context, info) => {
      return comments;
    },
  },
  User: {
    posts: (parent, args, context, into) => {
      return posts.filter((post) => post.author === parent.id);
    },
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(PORT, () => console.log(`Yoga Server started at PORT : ${PORT}`));
