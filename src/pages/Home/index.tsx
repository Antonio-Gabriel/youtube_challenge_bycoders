import { IUserProps } from "../../types/IUserProps";

export function Home() {
  const user = JSON.parse(
    localStorage.getItem("bycoders-user") ?? ""
  ) as IUserProps;

  return <h2>Home, {console.log(user.name)} </h2>;
}
