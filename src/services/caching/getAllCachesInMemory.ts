import { db } from "./database";

type InMemoryCacheProps = {
  id: string;
  filterName: string;
  userId: string;
  createdAt: string;
};

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("bycoders-user") ?? "");
}

export async function getAllCachesInMemory() {
  const histories = await db.histories.toArray();

  return histories;
}
