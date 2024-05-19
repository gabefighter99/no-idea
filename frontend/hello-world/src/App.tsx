import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
	const [hello, setHello] = useState("")
	useEffect(() => {
		axios.get("http://localhost:8080/helloworld").then(r => {
			setHello(r.data)
		})
			.catch(err => {
				console.error(err)
			})
	}, [])
	return (<p>{hello}</p>)
}

export default App;
