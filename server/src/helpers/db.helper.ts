import { Pool } from "pg";

// TODO - remove variables
export async function db<T>(query: string, variables?: unknown[]): Promise<T[]> {
  const pool = new Pool();
  const client = await pool.connect();

  if (
    process.env["DEMO"] === "true" &&
    (query.includes("insert") || query.includes("update") || query.includes("delete"))
  ) {
    return [];
  }

  try {
    await client.query("BEGIN");
    let res;
    if (variables) {
      res = await client.query<T>(query, [...variables]);
    } else {
      res = await client.query<T>(query);
    }
    await client.query("COMMIT");
    return res.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    void pool.end();
  }
}
