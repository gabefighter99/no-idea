package main

import (
	"fmt"
	"net/http"
)

func helloWorldHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w, "Hello World")
		fmt.Fprintf(w, "Alvin is a bitch")
	default:
		http.Error(w, "Invalid request method.", 405)
	}
}

func main() {
	http.HandleFunc("/helloworld", helloWorldHandler)
	http.ListenAndServe(":8080", nil)
}
