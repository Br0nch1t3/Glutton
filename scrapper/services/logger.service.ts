import dayjs from "dayjs";
import { InspectOptions, inspect } from "util";
import { Color, withColor } from "../utils/logging";

const PREFIXES = {
  info: withColor(Color.PURPLE, "[INFO]"),
  debug: withColor(Color.BLUE, "[DEBUG]"),
  error: withColor(Color.RED, "[ERROR]"),
};

export default abstract class Logger {
  static info(message?: any, ...optionalParams: any[]) {
    console.info(PREFIXES.info + this.getDate(), message, ...optionalParams);
  }
  static error(message?: any, ...optionalParams: any[]) {
    console.error(PREFIXES.error + this.getDate(), message, ...optionalParams);
  }
  static debug(message?: any, ...optionalParams: any[]) {
    console.debug(
      PREFIXES.debug + this.getDate(),
      typeof message === "object"
        ? inspect(message, { showHidden: false, depth: null, colors: true })
        : message,
      ...optionalParams,
    );
  }

  static dir(message?: object, options?: InspectOptions) {
    console.dir(message, { depth: null });
  }

  static timer<T>(name: string, cb: () => T) {
    const before = Date.now();
    const result = cb();
    this.debug(`${name}: `, Date.now() - before);
    return result;
  }
  static async asyncTimer<T>(name: string, cb: () => Promise<T>) {
    const before = Date.now();
    const result = await cb();
    this.debug(`${name}: `, Date.now() - before);
    return result;
  }

  private static getDate() {
    return `[${dayjs().format("HH:mm:ss")}]`;
  }
}
