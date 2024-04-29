package dto_request

type HTMLChunkRequestParams struct {
	Timestamp *string `query:"timestamp" validate:"date,required"`
}

type HTMLChunkRequestBody struct {
	Source string     `json:"source"`
	Data   []HTMLData `json:"data"`
}

type HTMLData struct {
	Name    string                      `json:"name"`
	Metrics map[string]NumericDataEntry `json:"metrics"`
}

type NumericDataEntry struct {
	Value float64 `json:"value"`
	Type  string  `json:"type" validate:"oneof='% $ none'"`
}
