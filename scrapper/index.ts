import express from "express";
import RSSService from "./services/rss.service";
import Logger from "./services/logger.service";
import { useInterceptors } from "./utils/interceptors";
import RSSEndpoint from "./endpoints/rss.endpoint";
import HTMLScrapperService from "./services/html-scrapper.service";
import HTMLEndpoint from "./endpoints/html.endpoint";
import SeleniumService from "./services/selenium.service";
import liveCoinWatchScrapper from "./scrappers/livecoinwatch.scrapper";

useInterceptors();
export const app = express();

const port = 3001;

const rssService = new RSSService(new RSSEndpoint());
const htmlScrapperService = new HTMLScrapperService(
  new HTMLEndpoint(),
  new SeleniumService(),
);

rssService.init();
htmlScrapperService.init(liveCoinWatchScrapper);

app.listen(port, () => {
  Logger.info(`Running scrapper on http://localhost:${port}`);
});
