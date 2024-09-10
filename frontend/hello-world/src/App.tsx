import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StageComponent from "./components/Stage";

function App() {
  const ws = new WebSocket("ws://localhost:8080/ws?room=MAIN");
  ws.onopen = () => {
    console.log("WebSocket connection opened");

    ws.onmessage = (e) => {
      console.log("Message received: ", e.data);
      const msg = { type: "response", message: e.data };
      ws.send(JSON.stringify(msg));
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.onerror = (error) => {
      console.log("WebSocket error", error);
    };
  };

  const [, setHello] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/helloworld")
      .then((r) => {
        setHello(r.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="App">
      <button
        onClick={() => {
          ws.send("hello");
        }}
      />
      <StageComponent />
    </div>
  );
}

export default App;
