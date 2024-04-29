package utils

import (
	"fmt"
	"time"
)

// Sort layouts by most complex to least complex to get the optimum amount of information (ex: time.RFC1123Z, timeRFC1123)
func TimeParse(layouts []string, date string) (time.Time, error) {
	var timestamp time.Time
	var err error

	for i := 0; i < len(layouts); i++ {
		timestamp, err = time.Parse(layouts[i], date)

		if err == nil {
			break
		}
	}

	if err != nil {
		return timestamp, fmt.Errorf("date %s couldn't be parsed with those layouts: %v", date, layouts)
	}

	return timestamp, err
}
