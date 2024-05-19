package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func saveBoardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	switch r.Method {
	case "POST":
		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			http.Error(w, "Error parsing form.", 400)
			fmt.Println(err)
			return
		}

		file, handler, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "Error retrieving file.", 400)
			fmt.Println(err)
			return
		}

		defer file.Close()

		f, err := os.OpenFile("./drawings/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0o666)
		if err != nil {
			http.Error(w, "Error opening file.", 400)
			fmt.Println(err)
			return
		}

		defer f.Close()

		_, err = io.Copy(f, file)
		if err != nil {
			http.Error(w, "Error copying file.", 400)
			fmt.Println(err)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "File uploaded successfully.")

	default:
		http.Error(w, "Invalid request method.", 405)
	}
}

func helloWorldHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	switch r.Method {
	case "GET":
		fmt.Fprintf(w, "Hello World")
		fmt.Fprintf(w, " Gabe is a bitch")
	default:
		http.Error(w, "Invalid request method.", 405)
	}
}

func main() {
	http.HandleFunc("/helloworld", helloWorldHandler)
	http.HandleFunc("/saveBoard", saveBoardHandler)
	http.ListenAndServe(":8080", nil)
}
