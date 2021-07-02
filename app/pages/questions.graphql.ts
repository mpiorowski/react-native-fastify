import { gql, useMutation, useQuery } from "urql";

export function useFindAllQuestions(username: string) {
  const query = gql`
    query ($username: String) {
      questions(username: $username) {
        id
        number
        question
        answer1
        answer2
        answer3
        answer4
        answered(username: $username)
      }
    }
  `;
  const [result, reexecuteQuery] = useQuery({
    query,
    variables: { username },
    pause: !username || username === "",
  });
  const { data, fetching, error } = result;

  return { data, fetching, error, reexecuteQuery };
}

export function useFindQuestion(username: string, number: number) {
  const query = gql`
    query ($username: String, $number: Int) {
      question(number: $number, username: $username) {
        id
        number
        question
        answer1
        answer2
        answer3
        answer4
        answered(username: $username)
      }
    }
  `;
  const [result, reexecuteQuery] = useQuery({
    query,
    variables: { username, number },
    pause: !username || username === "",
  });
  const { data, fetching, error } = result;

  return { data, fetching, error, reexecuteQuery };
}

export function useAnswer() {
  const query = gql`
    mutation ($number: Int, $answer: Int, $username: String) {
      addAnswer(number: $number, answer: $answer, username: $username)
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data, fetching, error } = result;
  return { mutate, data, fetching, error };
}
