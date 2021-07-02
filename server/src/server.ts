import dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import { loaders } from "./loaders";
import { resolvers } from "./resolvers";
import { schema } from "./schema";
dotenv.config();

export type Context = { request: FastifyRequest; reply: FastifyReply };

const app = Fastify({
  logger: true,
});
app.register(require("fastify-cors"), {
  // put your options here
});

// error handler
app.setErrorHandler(function (error, _request, reply) {
  app.log.error(error);
  return reply.status(400).send(error);
});

// const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
//   return {
//     user: req.user as User,
//   };
// };
void app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  graphiql: process.env["NODE_ENV"] === "development" ? true : false,
  // context: buildContext,
});

// Run the server!
const start = async () => {
  try {
    // fastify server startup
    await app.listen(4000, "0.0.0.0");
    app.log.info(`server listening on 4000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
void start();
