import { api } from "./api";

export async function getRelatedVideosService(token: string, id?: string) {
  return await (
    await api.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        pageToken: token,
        type: "video",
      },
    })
  ).data;
}
