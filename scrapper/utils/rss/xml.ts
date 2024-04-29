export function getXmlElementContent<T extends string>(
  data: string,
  element: string,
): T | undefined {
  return new RegExp(`<${element}.+?>(.+)</${element}>`, "g")
    .exec(data)
    ?.at(1) as T;
}
