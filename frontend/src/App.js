// libraries
import "./App.scss";
import { useEffect, useState } from "react";

// custom hooks
import {} from "./hooks/vroom";

// components
import Navbar from "./components/Navbar";

// page router
import PageRouter from "./Router";
import Card from "./components/ListCard";

export default function App() {
	return (
		<div className="App">
			<Navbar />
			<PageRouter />
		</div>
	);
}
