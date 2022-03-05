import { db } from "./database";

type InMemoryCache = {
  search: string;
};

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("bycoders-user") ?? "");
}

export async function saveFilterHistoryInMemoryCache({
  search,
}: InMemoryCache) {
  const id = await db.histories.add({
    filterName: search,
    userId: getCurrentUser().id,
    createdAt: new Date().toLocaleString(),
  });

  return id;
}
