import axios, { AxiosError } from "axios";
import feeds from "../assets/feeds.json";
import Service from "./base.service";
import EnvService from "./env.service";
import RSSEndpoint from "../endpoints/rss.endpoint";
import Logger from "./logger.service";
import { RSSUpdatePeriod } from "../utils/rss/update";
import { getXmlElementContent } from "../utils/rss/xml";
import {
  HTTP_STATUS_NOT_MODIFIED,
  getConfitionalGetHeaders,
} from "../utils/http";
import { Color, withColor } from "../utils/logging";

export default class RSSService extends Service {
  private etag?: string;
  private lastModified?: string;

  constructor(private rssEndpoint: RSSEndpoint) {
    super();
  }

  init() {
    if (EnvService.getScrapOnLaunch()) {
      for (const url of feeds.rss) {
        this.update(url);
      }
    }
  }

  async update(url: string, ttl?: number) {
    try {
      const source = new URL(url).hostname;
      const { data, headers } = await axios.get<string>(url, {
        headers: getConfitionalGetHeaders(this.lastModified, this.etag),
      });
      Logger.debug(
        `${withColor(Color.YELLOW, "[RSS]")}FETCHED FROM`,
        withColor(Color.PURPLE, source),
      );
      this.etag = headers["ETag"];
      this.lastModified = headers["Last-Modified"];
      const ms = ttl ?? this.getRssTtl(data, this.lastModified!);

      setTimeout(() => this.update(url, ms), ms);

      await this.send(data, source);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === HTTP_STATUS_NOT_MODIFIED) {
          setTimeout(() => this.update(url), 60000);
        }
        Logger.error("Couldn't reach: ", error.config?.url);
      } else {
        Logger.error(error);
      }
    }
  }

  private async send(data: string, source: string) {
    return this.rssEndpoint.sendUpdateChunk(data, source);
  }

  private getRssTtl(rss: string, lastModified: string) {
    const updatePeriod =
      getXmlElementContent<RSSUpdatePeriod>(rss, "sy:updatePeriod") ??
      RSSUpdatePeriod.DAILY;
    const updateFrequency = Number.parseInt(
      getXmlElementContent(rss, "sy:updateFrequency") ?? "",
    );
    const parsedFrequency = Number.isNaN(updateFrequency) ? 1 : updateFrequency;

    return RSSUpdatePeriod.toMilliseconds(
      updatePeriod,
      lastModified,
      parsedFrequency,
    );
  }
}
