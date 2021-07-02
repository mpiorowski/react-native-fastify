import { IResolvers } from "mercurius";
import {
  addAnswer,
  getAllQuestions,
  getQuestion
} from "./questions/questions.db";

export const resolvers: IResolvers = {
  Query: {
    questions: async (_parent, _args, _context) => await getAllQuestions(),
    question: async (_parent, args: { number: number }, _context) =>
      await getQuestion(args),
  },
  Mutation: {
    addAnswer: async (
      _: unknown,
      data: { number: number; answer: number; username: string }
    ) => await addAnswer(data),
  },
};
