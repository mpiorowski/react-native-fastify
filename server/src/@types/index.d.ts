import "fastify";
import "mercurius";
import { User } from "../../../@types/users.types";

declare module "fastify" {
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    authenticate: () => void;
  }
}

type Context = { user: User };

declare module "mercurius" {
  export interface MercuriusContext {
    user: User;
  }
}
