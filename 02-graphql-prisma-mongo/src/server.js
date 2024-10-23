import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const { hashSync, compareSync } = bcrypt;
const { sign, verify } = jwt;

const SECRET_KEY = "MY_SUPER_SECRET_KEY";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput): SignUpPayload!
    signIn(data: SignInInput): SignInPayload!
    createPost(data: CreatePostInput!): PostPayload!
  }

  type Query {
    hello: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type User {
    name: String!
    age: Int!
    email: String!
  }

  type SignUpPayload {
    message: String!
  }

  type SignInPayload {
    token: String!
  }

  type PostPayload {
    message: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }
  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
  }

  input SignInInput {
    email: String!
    password: String!
  }

  enum Role {
    ADMIN
    MANAGER
    DEVELOPER
  }
`;

const resolvers = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const { name, age, email, password, role } = args.data;
        const hashedPassword = hashSync(password, 12);
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password: hashedPassword,
            role,
          },
        });
        return { message: "User created successfully!" };
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    signIn: async (parent, args, context, info) => {
      try {
        const { email, password } = args.data;

        const foundUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!foundUser) {
          throw new GraphQLError("Unable to find user for email - " + email);
        }

        const isMatch = compareSync(password, foundUser.password);

        if (!isMatch) {
          throw new GraphQLError("Bad Password");
        }

        const token = sign(
          {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
          },
          SECRET_KEY
        );

        return { token };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      try {
        if (token === null) {
          throw new GraphQLError("Authorization failed");
        }
        const { id, name, email, role } = verify(token, SECRET_KEY);

        const { title, body } = args.data;

        await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            authorId: id,
          },
        });

        return { message: "Post successfully created" };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
  Query: {
    hello: () => "World",
    posts: async (parent, args, context, info) => {
      try {
        const allPosts = await prisma.post.findMany({
          include: {
            author: true,
          },
          // take: 2,
          // skip: 1,
          orderBy: {
            title: "desc",
          },
        });
        return allPosts;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: ({ request }) => {
    let token = null;
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      token = authHeader.split(" ")[1]; // "Bearer TOKEN_VALUE" => ["Bearer", "TOKEN_VALUE"]
    }
    return {
      token,
    };
  },
});

const server = createServer(yoga);

server.listen(4000, () => console.log("Yoga started at PORT: 4000"));
