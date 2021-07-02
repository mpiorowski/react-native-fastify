export const schema = `
  type Query {
    questions(username: String): [Question]
    question(username: String, number: Int): Question
  }

  type Mutation {
    addAnswer(number: Int, answer: Int, username: String): Boolean
  }

  type Question {
    id: ID

    created: String
    edited: String
    active: Boolean

    question: String
    number: Int
    answer1: String
    answer2: String
    answer3: String
    answer4: String
    correct: Int
    answered(username: String): Boolean
    date: String
  }

  type Answer {
    id: ID
    created: String
    edited: String
    active: Boolean

    username: String

    q1: Int
    q2: Int
    q3: Int
    q4: Int
    q5: Int
    q6: Int
    q7: Int
    q8: Int
    q9: Int
    q10: Int
    q11: Int
    q12: Int
    q13: Int
    q14: Int
    q15: Int
    q16: Int
  }
`;
