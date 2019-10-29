package model

// Result contains the result of playing the game between two players
type Result struct {
	LeftChoice    Choice
	RightChoice   Choice
	WinningChoice Choice
}

var nilResult = Result{nilChoice, nilChoice, nilChoice}

// Play returns the choice that wins, given two players
func Play(left ChoiceID, right ChoiceID) (Result, error) {
	leftChoice, err := GetChoiceByID(left)
	if err != nil {
		return nilResult, err
	}

	rightChoice, err := GetChoiceByID(right)
	if err != nil {
		return nilResult, err
	}

	if left == right {
		return Result{leftChoice, rightChoice, leftChoice}, nil
	}

	winner := rightChoice
	doesLeftBeatRight, ok := leftChoice.beats[rightChoice.Name]
	if ok && doesLeftBeatRight {
		winner = leftChoice
	}

	return Result{leftChoice, rightChoice, winner}, nil
}
