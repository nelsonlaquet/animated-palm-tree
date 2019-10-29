package handlers

import (
	"net/http"

	"../model"
	"../util"
)

// ChoiceHandler ...
func ChoiceHandler(w http.ResponseWriter, r *http.Request) {
	if !disableCors(w, r) {
		return
	}

	choice, err := model.GetRandomChoice()
	if err != nil {
		util.WriteJSONError(err, w)
		return
	}

	util.WriteJSON(choice, w)
}
