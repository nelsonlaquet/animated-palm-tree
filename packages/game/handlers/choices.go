package handlers

import (
	"net/http"

	"../model"
	"../util"
)

// ChoicesHandler ...
func ChoicesHandler(w http.ResponseWriter, r *http.Request) {
	if !disableCors(w, r) {
		return
	}

	util.WriteJSON(model.Choices, w)
}
