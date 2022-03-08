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
  const historyAlreadyExists = await db.histories.get({
    filterName: search,
    userId: getCurrentUser().id,
  });

  if (!historyAlreadyExists) {
    const id = await db.histories.add({
      filterName: search,
      userId: getCurrentUser().id,
      createdAt: new Date().toLocaleString(),
    });

    return id;
  }
}
