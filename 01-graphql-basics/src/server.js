import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const PORT = 4040;

const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
    hello: () => "World!",
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
