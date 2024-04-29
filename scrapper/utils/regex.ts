import Logger from "../services/logger.service";

export const execRegexOnce = (regex: RegExp) => (s: string) => {
  const result = regex.exec(s);

  regex.lastIndex = 0;
  return result;
};
