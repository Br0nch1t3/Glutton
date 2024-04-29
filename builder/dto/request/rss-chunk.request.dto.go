package dto_request

type RSSChunkRequestParams struct {
	Timestamp *string `query:"timestamp" validate:"date"`
	Source    string  `query:"source" validate:"required"`
}

type RSSChunkRequestBody struct {
	Channel RSSChannel `xml:"channel"`
}

type RSSChannel struct {
	Title         string           `xml:"title"`
	Description   string           `xml:"description"`
	Item          []RSSChannelItem `xml:"item"`
	Link          string           `xml:"link"`
	LastBuildDate *string          `xml:"lastBuildDate"`
	PubDate       *string          `xml:"pubDate"`
}

type RSSChannelItem struct {
	Title       string `xml:"title"`
	Comments    string `xml:"comments"`
	Category    string `xml:"category"`
	Description string `xml:"description"`
}
