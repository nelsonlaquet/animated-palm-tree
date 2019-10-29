package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"../model"
	"../util"
)

type gameRequest struct {
	Player int `json:"player"`
}

type gameResponse struct {
	Results        string         `json:"results"`
	PlayerChoice   model.ChoiceID `json:"player"`
	ComputerChoice model.ChoiceID `json:"computer"`
}

// PlayHandler ...
func PlayHandler(w http.ResponseWriter, r *http.Request) {
	if !disableCors(w, r) {
		return
	}

	if r.Method != http.MethodPost {
		util.WriteJSONError(errors.New("Expected POST"), w)
		return
	}

	// we use HasPrefix instead of an equality check because some http libraries like adding a "charset utf-8" in
	// addition to the application/json part, and we are only doing a conten-type check here as a sanity check... a more
	// robust http handling library would parse out the charset properly
	if !strings.HasPrefix(r.Header.Get("Content-type"), "application/json") {
		util.WriteJSONError(errors.New("Expected Content-Type of application/json"), w)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var request gameRequest
	err := decoder.Decode(&request)
	if err != nil {
		util.WriteJSONError(err, w)
		return
	}

	computerChoice, err := model.GetRandomChoice()
	if err != nil {
		util.WriteJSONError(err, w)
		return
	}

	playerChoiceID := model.ChoiceID(request.Player)
	computerChoiceID := computerChoice.ID
	response, err := model.Play(playerChoiceID, computerChoiceID)
	if err != nil {
		util.WriteJSONError(err, w)
		return
	}

	finalResponse := gameResponse{"", playerChoiceID, computerChoiceID}
	if response.WinningChoice.ID == playerChoiceID && response.WinningChoice.ID == computerChoiceID {
		finalResponse.Results = "tie"
	} else if response.WinningChoice.ID == playerChoiceID {
		finalResponse.Results = "win"
	} else {
		finalResponse.Results = "lose"
	}

	util.WriteJSON(finalResponse, w)
}
