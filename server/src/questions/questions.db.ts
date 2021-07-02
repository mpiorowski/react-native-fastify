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

export async function getQuestion(data: { number: number }): Promise<Question> {
  try {
    const queryText = `select * from questions where date < now() and number= ${data.number}`;
    const response = await db<Question>(queryText);
    if (!response[0]) {
      throw "Question not exists";
    }
    return response[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addAnswer(data: {
  number: number;
  answer: number;
  username: string;
}): Promise<boolean> {
  try {
    const queryText = `INSERT INTO answers (username, "q${String(data.number)}")
    VALUES('${data.username}', ${data.answer}) 
    ON CONFLICT (username) 
    DO 
       UPDATE SET "q${String(data.number)}" = ${data.answer}`;
    await db<Question>(queryText);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkIfAnswered(data: {
  number: number;
  username: string;
}): Promise<boolean> {
  try {
    const queryText = `select from answers where username = '${
      data.username
    }' and q${String(data.number)} is not null`;
    const response = await db<Question>(queryText);
    return response.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
