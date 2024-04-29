export interface RSSChannel {
  title: string;
  link: string;
  description: string;
  language?: string;
  lastBuildDate?: string;
  "sy:updatePeriod"?: string;
  "sy:updateFrequency"?: 2;
  ttl?: number;
  item: RSSChannelItem[];
}

export interface RSSResponse {
  channel: RSSChannel;
}

export interface RSSChannelItem {
  title?: string;
  link?: string;
  comments?: string;
  "dc:creator"?: string;
  pubDate?: Date;
  category?: string;
  guid?: RSSChannelItemGUID;
  description?: string;
  "content:encoded"?: string;
  "wfw:commentRss"?: string;
  "slash:comments"?: number;
}

export type RSSChannelItemGUID =
  | {
      isPermaLink?: boolean;
      $t?: string;
    }
  | string;
