import { useSearchParams } from "react-router-dom";

export function Search() {
  const [searchParams] = useSearchParams();

  return <h2>{searchParams.get("search_query")}</h2>;
}
