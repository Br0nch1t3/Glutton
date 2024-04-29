import axios from "axios";
import Endpoint from "./base.endpoint";
import { HTMLRequest } from "../models/requests/html.request";
import EnvService from "../services/env.service";

export default class HTMLEndpoint extends Endpoint {
  constructor() {
    super("html");
  }

  async sendUpdateChunk(updateChunk: HTMLRequest) {
    const params =
      EnvService.getNodeEnv() === "debug"
        ? { test: btoa(JSON.stringify(updateChunk)).slice(0, 3000) }
        : undefined;

    return axios.post(this.baseUrl, updateChunk, { params });
  }
}
