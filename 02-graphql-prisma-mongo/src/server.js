import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

const { hashSync, compareSync } = bcrypt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput): SignUpPayload!
    signIn(data: SignInInput): SignInPayload!
  }

  type Query {
    hello: String!
  }

  type SignUpPayload {
    message: String!
  }

  type SignInPayload {
    token: String!
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

        return { token: "TOKEN_VALUE" };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
  Query: {
    hello: () => "World",
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

server.listen(4000, () => console.log("Yoga started at PORT: 4000"));
