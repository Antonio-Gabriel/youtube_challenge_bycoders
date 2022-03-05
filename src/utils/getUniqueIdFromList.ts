export function getUniqueElementsFromList(array: Array<object>, key: string) {
  return [...new Map(array.map((item: any) => [item[key], item])).values()];
}
