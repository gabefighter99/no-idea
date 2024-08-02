import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StageComponent from "./components/Stage";

function App() {
  const [hello, setHello] = useState("");
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
      <StageComponent />
    </div>
  );
}

export default App;
