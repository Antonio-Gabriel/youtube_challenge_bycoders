import { db } from "./database";

export function deleteSelectedCache(id: number) {
  db.histories.where({ id: id }).delete();
}
