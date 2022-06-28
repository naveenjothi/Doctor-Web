import axios from "axios";
import { NextApiRequest } from "next";
import { parseCookies } from "nookies";
export async function apiQuery<T>(
  req: NextApiRequest,
  query: string,
  variables: any
) {
  const endpoint = process.env.API_ENDPOINT || "";

  try {
    const cookies = parseCookies({ req });

    const response = await axios.post<T>(
      endpoint,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(`[Error] ${e}`);
    throw e;
  }
}
