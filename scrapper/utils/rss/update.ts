import dayjs from "dayjs";

const YEAR_IN_MS = 31536000000;
const DAY_IN_MS = 86400000;
const HOUR_IN_MS = 3600000;
const MONTH_IN_MS = 2678400000;
const WEEK_IN_MS = 604800000;

export enum RSSUpdatePeriod {
  DAILY = "daily",
  HOURLY = "hourly",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export namespace RSSUpdatePeriod {
  export function toMilliseconds(
    updatePeriod: RSSUpdatePeriod,
    baseDate?: string,
    frequency?: number,
  ) {
    const _baseDate = dayjs(baseDate);
    const validBaseDate = _baseDate.isValid() ? _baseDate : dayjs();

    switch (updatePeriod) {
      case RSSUpdatePeriod.YEARLY:
        return validBaseDate
          .add(frequency ? YEAR_IN_MS / frequency : YEAR_IN_MS)
          .diff();
      case RSSUpdatePeriod.MONTHLY:
        return validBaseDate
          .add(frequency ? MONTH_IN_MS / frequency : MONTH_IN_MS)
          .diff();
      case RSSUpdatePeriod.WEEKLY:
        return validBaseDate
          .add(frequency ? WEEK_IN_MS / frequency : WEEK_IN_MS)
          .diff();
      case RSSUpdatePeriod.DAILY:
        return validBaseDate
          .add(frequency ? DAY_IN_MS / frequency : DAY_IN_MS)
          .diff();
      case RSSUpdatePeriod.HOURLY:
        return validBaseDate
          .add(frequency ? HOUR_IN_MS / frequency : HOUR_IN_MS)
          .diff();
    }
  }
}
