import { gql, useQuery } from "urql";

export function useFindAllQuestions() {
  const query = gql`
    query {
      questions {
        id
        number
        question
        answer1
        answer2
        answer3
        answer4
      }
    }
  `;
  const [result, reexecuteQuery] = useQuery({
    query,
    variables: {},
  });
  const { data, fetching, error } = result;

  return { data, fetching, error, reexecuteQuery };
}
