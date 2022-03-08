import { api } from "./api";

export async function getChannelByIdService(channelId: string) {
  return await (
    await api.get("/channels", {
      params: {
        part: "snippet",
        id: channelId,
      },
    })
  ).data;
}
