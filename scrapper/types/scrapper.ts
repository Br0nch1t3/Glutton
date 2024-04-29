import { WebDriver } from "selenium-webdriver";
import { HTMLRequest } from "../models/requests/html.request";

export type Scrapper = (driver: WebDriver) => Promise<HTMLRequest>;
