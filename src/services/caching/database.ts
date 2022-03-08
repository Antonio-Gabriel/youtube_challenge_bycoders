import Dexie from "dexie";

export const db: Dexie | any = new Dexie("caching");

db.version(1).stores({
  histories: "++id, [filterName+userId], createdAt",
});
