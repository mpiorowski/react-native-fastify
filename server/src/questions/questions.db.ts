import { db } from "../helpers/db.helper";

type Question = {
  id: string;
  created: string;
  edited: string;
  active: boolean;

  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct: number;
  date: Date;
};

export async function getAllQuestions(): Promise<Question[]> {
  try {
    const queryText = `select * from questions where date < now() limit 4`;
    const response = await db<Question>(queryText);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
