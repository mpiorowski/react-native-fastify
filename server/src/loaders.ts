// import { Context } from "./server";
import { MercuriusLoaders } from "mercurius";
import { checkIfAnswered } from "./questions/questions.db";

export const loaders: MercuriusLoaders = {
  Question: {
    async answered(queries: { obj: any; params: any }[]): Promise<any> {
      const promises = queries.map(
        async ({ obj, params }: { obj: any; params: any }) => {
          return await checkIfAnswered({
            username: params.username,
            number: obj.number,
          });
        }
      );
      return Promise.all(promises);
    },
  },
};
