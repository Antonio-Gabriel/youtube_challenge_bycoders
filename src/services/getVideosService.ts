import { api } from "./api";

export async function getVideoServices(token: string) {
  return await (
    await api.get("/videos", {
      params: {
        part: "snippet,contentDetails, statistics",
        chart: "mostPopular",
        regionCode: "BR",
        maxResults: 20,
        pageToken: token,
      },
    })
  ).data;
}
