export interface HTMLRequest {
  source: string;
  data: Array<HTMLData>;
}

export interface HTMLData {
  name: string;
  metrics: Record<string, NumericDataEntry>;
}

export enum NumericDataEntryType {
  PERCENTAGE = "%",
  PRICE = "$",
  NONE = "none",
}
export type NumericDataEntry = { value: number; type: NumericDataEntryType };
