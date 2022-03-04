import { api } from "./api";

export async function getVideoServices() {
  return await (
    await api.get("/videos", {
      params: {
        part: "snippet,contentDetails",
        chart: "mostPopular",
        regionCode: "BR",
        maxResults: 20,
      },
    })
  ).data;
}
