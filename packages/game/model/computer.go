package model

import (
	"encoding/json"
	"net/http"
)

type randomResponse struct {
	RandomNumber int `json:"random_number"`
}

// GetRandomChoice ...
func GetRandomChoice() (Choice, error) {
	resp, err := http.Get("https://codechallenge.boohma.com/random")
	if err != nil {
		return nilChoice, err
	}

	var result randomResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nilChoice, err
	}

	var randomIndex = result.RandomNumber % len(Choices)
	return Choices[randomIndex], nil
}
