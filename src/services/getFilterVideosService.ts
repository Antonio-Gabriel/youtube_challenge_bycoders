import { api } from "./api";

export async function getFilterVideosService(
  search?: string,
  token: string = ""
) {
  return await (
    await api.get("/search", {
      params: {
        part: "snippet",
        maxResults: 8,
        pageToken: token,
        q: search,
        type: "video",
      },
    })
  ).data;
}
