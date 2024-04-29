import { RSSResponse } from "../responses/rss.response";

export interface RSSRequest {
  source: string;
  rss: RSSResponse;
}
