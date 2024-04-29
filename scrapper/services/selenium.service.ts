import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import Service from "./base.service";

export default class SeleniumService extends Service {
  driver: WebDriver | null = null;
  private options: Options;

  constructor() {
    super();
    this.options = new Options().addArguments(
      "--headless",
      "--remote-debugging-pipe",
      "--verbose",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-blink-features=AutomationControlled",
      "--disable-extensions",
      "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    );
  }

  async init() {
    this.driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(this.options)
      .build();
  }
}
