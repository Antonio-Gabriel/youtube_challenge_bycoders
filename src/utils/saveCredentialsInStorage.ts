export function saveCredentialsInStorage(props: any) {
  for (const key in props) {
    const element = props[key];

    if (typeof element === "object") {
      localStorage.setItem(`${key}`, JSON.stringify(element));
    } else {
      localStorage.setItem(`${key}`, element);
    }
  }
}
