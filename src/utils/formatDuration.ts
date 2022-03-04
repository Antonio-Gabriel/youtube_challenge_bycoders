import moment from "moment";

export function formatDuration(duration: string) {
  const seconds = moment.duration(duration).asSeconds();
  return moment.utc(seconds * 1000).format("mm:ss");
}
