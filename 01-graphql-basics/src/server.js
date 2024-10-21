import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { loadFile } from "graphql-import-files";
import db from "./db/data.js";
import resolvers from "./graphql/resolvers/index.js";

const PORT = 4040;

const schema = createSchema({
  typeDefs: loadFile("./src/graphql/schema.graphql"),
  resolvers,
});

const yoga = createYoga({
  schema,
  context: { db },
});

const server = createServer(yoga);

server.listen(PORT, () => console.log(`Yoga Server started at PORT : ${PORT}`));
