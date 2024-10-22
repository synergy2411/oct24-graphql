import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput): SignUpPayload!
  }

  type Query {
    hello: String!
  }

  type SignUpPayload {
    message: String!
  }

  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
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
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password,
            role,
          },
        });
        return { message: "User created successfully!" };
      } catch (err) {
        console.log(err);
        return err;
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
