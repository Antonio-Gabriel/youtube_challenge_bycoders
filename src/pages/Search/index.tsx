import { Results } from "../../views/Results";
import { Header } from "../../components/Header";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Header filter={searchParams?.get("search_query") ?? ""} />
      <Results filter={searchParams?.get("search_query") ?? ""} />
    </>
  );
}
