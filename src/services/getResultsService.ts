import { api } from "./api";

export async function getResultsService(search?: string, token?: string) {
  return await (
    await api.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: token,
        q: search,
        type: "video",
      },
    })
  ).data;
}
