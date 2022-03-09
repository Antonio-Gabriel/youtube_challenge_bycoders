import { api } from "./api";

export async function getVideoById(id: string) {
  return await (
    await api.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: id,
      },
    })
  ).data;
}
