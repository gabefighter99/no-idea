package main

import (
	"fmt"
	"net/http"

	ws "github.com/gorilla/websocket"
)

type Element struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

type Room struct {
	clients    map[*ws.Conn]bool
	history    []Element
	broadcast  chan Element
	register   chan *ws.Conn
	unregister chan *ws.Conn
}

var (
	rooms    = make(map[string]*Room)
	upgrader = ws.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

func (room *Room) run() {
	for {
		select {
		case elem := <-room.broadcast:
			fmt.Printf("Broadcasting: %s\n", elem)
			room.history = append(room.history, elem)
			for client := range room.clients {
				err := client.WriteJSON(elem)
				if err != nil {
					fmt.Printf("Error: %s\n", err)
					room.unregister <- client
					continue
				}
			}
		case client := <-room.register:
			fmt.Printf("Registering: %s\n", client.LocalAddr())
			if _, ok := room.clients[client]; ok {
				continue
			}

			room.clients[client] = true
			for _, msg := range room.history {
				fmt.Printf("message %s", msg)
				err := client.WriteJSON(msg)
				if err != nil {
					fmt.Printf("Error during history: %s\n", client.LocalAddr())
					room.unregister <- client
					return
				}
			}
		case client := <-room.unregister:
			fmt.Printf("Closing: %s\n", client.LocalAddr())
			delete(room.clients, client)
			client.Close()
		}
	}
}

func handleMessages(conn *ws.Conn, room *Room) {
	for {
		var elem Element
		// err := conn.ReadJSON(&elem)
		typ, bytes, err := conn.ReadMessage()
		fmt.Printf("Error handling: %d\n", typ)
		fmt.Printf("Error handling: %s\n", bytes)
		if err != nil {
			fmt.Printf("Error handling: %s\n", conn.LocalAddr())
			fmt.Printf("Error handling: %d\n", typ)
			fmt.Printf("Error handling: %s\n", bytes)
			room.unregister <- conn
			return
		}
		room.broadcast <- elem
	}
}

func collabHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	roomId := r.URL.Query().Get("room")
	fmt.Println("Room: " + roomId)
	if roomId == "" {
		conn.Close()
		return
	}
	if _, ok := rooms[roomId]; !ok {
		rooms[roomId] = &Room{
			clients:    make(map[*ws.Conn]bool),
			broadcast:  make(chan Element),
			register:   make(chan *ws.Conn),
			unregister: make(chan *ws.Conn),
		}
		go rooms[roomId].run()
	}
	rooms[roomId].register <- conn

	go handleMessages(conn, rooms[roomId])
}
