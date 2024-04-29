import { NumericDataEntryType } from "../models/requests/html.request";

export function newNumericDataEntry(
  regexResult?: RegExpExecArray | null,
  type = NumericDataEntryType.NONE,
) {
  const value = Number(regexResult?.at(1));
  let multiplicator = 1;

  switch (regexResult?.at(2)) {
    case "K":
      multiplicator = 1000;
      break;
    case "M":
      multiplicator = 1000000;
    case "B":
      multiplicator = 1000000000;
    default:
      break;
  }

  return { value: value * multiplicator, type };
}
