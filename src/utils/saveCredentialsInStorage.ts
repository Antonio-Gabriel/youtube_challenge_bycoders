export function saveCredentialsInStorage(props: any) {
  for (const key in props) {
    const element = props[key];

    if (typeof element === "object") {
      sessionStorage.setItem(`${key}`, JSON.stringify(element));
    } else {
      sessionStorage.setItem(`${key}`, element);
    }
  }
}
