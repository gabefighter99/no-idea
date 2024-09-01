package collab

import (
	"fmt"
	"net/http"

	ws "github.com/gorilla/websocket"
)

type Element struct{}

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
			room.history = append(room.history, elem)
			for client := range room.clients {
				err := client.WriteJSON(elem)
				if err != nil {
					room.unregister <- client
					continue
				}
			}
		case client := <-room.register:
			room.clients[client] = true
			for _, msg := range room.history {
				err := client.WriteJSON(msg)
				if err != nil {
					room.unregister <- client
					return
				}
			}
		case client := <-room.unregister:
			delete(room.clients, client)
			client.Close()
		}
	}
}

func handleMessages(conn *ws.Conn, room *Room) {
	for {
		var elem Element
		err := conn.ReadJSON(&elem)
		if err != nil {
			room.unregister <- conn
			return
		}
		room.broadcast <- elem
	}
}

func collabHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	roomId := r.URL.Query().Get("room")
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
