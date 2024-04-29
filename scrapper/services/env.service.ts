import { NodeEnv } from "../types/environment";
import "dotenv/config";

export default abstract class EnvService {
  static getNodeEnv(): "debug" | "prod" {
    return (process.env.NODE_ENV as NodeEnv) ?? "debug";
  }

  static getScrapOnLaunch(): boolean {
    return !!Number(process.env.SCRAP_ON_LAUNCH);
  }

  static getPostbinId(): string | undefined {
    return process.env.POSTBIN_ID;
  }

  static getBuilderUrl(): string {
    const postbinId = this.getPostbinId();

    if (postbinId) {
      return `https://www.toptal.com/developers/postbin/${postbinId}`;
    }
    return "http://builder:3002";
  }
}
