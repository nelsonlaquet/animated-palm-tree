package model

import "errors"

// ChoiceID represents a reference to a selected choice
type ChoiceID int

// Choice represents the option that a player can select
type Choice struct {
	ID    ChoiceID `json:"id"`
	Name  string   `json:"name"`
	beats map[string]bool
}

var choiceRock = Choice{1, "rock", map[string]bool{"scissors": true, "lizard": true}}
var choicePaper = Choice{2, "paper", map[string]bool{"rock": true, "spock": true}}
var choiceScissors = Choice{3, "scissors", map[string]bool{"paper": true, "lizard": true}}
var choiceLizard = Choice{4, "lizard", map[string]bool{"paper": true, "spock": true}}
var choiceSpock = Choice{5, "spock", map[string]bool{"rock": true, "scissors": true}}

var nilChoice = Choice{-1, "nil", map[string]bool{}}

// Choices is the list of available choices in the game, ordered canonically
var Choices = []Choice{
	choiceRock,
	choicePaper,
	choiceScissors,
	choiceLizard,
	choiceSpock,
}

// ChoiceMap maps from choice ids to choice instances
var ChoiceMap = make(map[ChoiceID]Choice)

func init() {
	for _, choice := range Choices {
		ChoiceMap[choice.ID] = choice
	}
}

// GetChoiceByID returns a choice object by id, or an error if the choice was not found
func GetChoiceByID(id ChoiceID) (Choice, error) {
	val, ok := ChoiceMap[id]

	if !ok {
		return nilChoice, errors.New("Choice id not found")
	}

	return val, nil
}
