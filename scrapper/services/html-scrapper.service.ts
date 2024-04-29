import { spawn } from "child_process";
import HTMLEndpoint from "../endpoints/html.endpoint";
import Service from "./base.service";
import { Browser, Builder, By, WebElement } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import Logger from "./logger.service";
import SeleniumService from "./selenium.service";
import { Scrapper } from "../types/scrapper";
import EnvService from "./env.service";
import { AxiosError } from "axios";
import {
  HTMLRequest,
  NumericDataEntryType,
} from "../models/requests/html.request";
import { Color, withColor } from "../utils/logging";

interface Crypto {
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  circulatingSupply: number;
  volume: number;
  growth: Record<string, number>;
}

export default class HTMLScrapperService extends Service {
  private ttl;

  constructor(
    private htmlEndpoint: HTMLEndpoint,
    private seleniumService: SeleniumService,
    ttl = 10000,
  ) {
    super();
    this.ttl = ttl;
  }

  async init(...scrappers: Array<Scrapper>) {
    if (this.seleniumService.driver === null) {
      await this.seleniumService.init();
    }
    if (EnvService.getScrapOnLaunch()) {
      await this.update(...scrappers);
    }
  }

  async update(...scrappers: Array<Scrapper>) {
    try {
      const driver = this.seleniumService.driver!;

      for (const scrapper of scrappers) {
        const data = await scrapper(driver);
        Logger.debug(
          `${withColor(Color.LIGHT_GREEN, "[HTML]")}FETCHED FROM`,
          withColor(Color.PURPLE, data.source),
        );
        await this.send(data);
      }
      setTimeout(() => this.update.bind(this)(...scrappers), this.ttl);
    } catch (error) {
      if (error instanceof AxiosError) {
        Logger.error("Couldn't reach:", error.config?.url);
        Logger.debug(error.response?.data);
      } else {
        Logger.error("Unknown error:", error);
      }
    }
  }

  private async send(data: HTMLRequest) {
    return this.htmlEndpoint.sendUpdateChunk(data);
  }

  quit() {
    return this.seleniumService.driver?.quit();
  }
}
