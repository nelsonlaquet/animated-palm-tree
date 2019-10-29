package util

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// WriteJSON writes JSON to the output stream of an HTTP resposne
func WriteJSON(v interface{}, w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.Encode(v)
	return nil
}

// WriteJSONError ...
func WriteJSONError(e error, w http.ResponseWriter) {
	errorString := e.Error()
	fmt.Printf("error: %s\n", errorString)
	w.WriteHeader(http.StatusInternalServerError)
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.Encode(struct {
		Error string `json:"error"`
	}{errorString})
}
