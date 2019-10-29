package main

import (
	"fmt"
	"log"
	"net/http"

	"./handlers"
)

func main() {
	fmt.Println("RPSLS: Game Service...")
	http.HandleFunc("/choices", handlers.ChoicesHandler)
	http.HandleFunc("/choice", handlers.ChoiceHandler)
	http.HandleFunc("/play", handlers.PlayHandler)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
