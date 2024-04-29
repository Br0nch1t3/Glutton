import axios from "axios";
import Endpoint from "./base.endpoint";

export default class RSSEndpoint extends Endpoint {
  defaultHeaders = { "Content-Type": "text/xml" };

  constructor() {
    super("rss");
  }

  async sendUpdateChunk(updateChunk: string, source: string) {
    return axios.post(this.baseUrl, updateChunk, {
      headers: this.defaultHeaders,
      params: {
        source,
      },
    });
  }
}
