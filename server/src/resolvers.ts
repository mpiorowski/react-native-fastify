import { IResolvers } from "mercurius";
import { getAllQuestions } from "./questions/questions.db";

export const resolvers: IResolvers = {
  Query: {
    questions: async (_parent, _args, _context) => await getAllQuestions(),
  },
};
