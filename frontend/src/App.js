// libraries
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components

// page router
import PageRouter from "./Router";
import Card from "./components/ListCard";

function App() {
    // basic sign in
    const [currentUserID, setCurrentUserID] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .get(`http://localhost:5000/members/signin/${username}`)
            .then((response) => {
                console.log(response.data);

                if (password === response.data.password) {
                    console.log("access granted");
                    signIn(response.data);
                } else {
                    console.log("access denied");
                }
            });
    }

    function signIn(userData) {
        console.log(
            "%cUser signed in: " + userData.display_name,
            "color: yellow"
        );
        console.log("%cUser ID: " + userData._id, "color: yellow");
        console.log("%cUser saved to localStorage", "color: yellow");

        setCurrentUserID(userData._id);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("user_id", userData._id);

        console.log(
            `%c${window.localStorage.getItem("username")}`,
            "color: cyan"
        );
        console.log(
            `%c${window.localStorage.getItem("user_id")}`,
            "color: cyan"
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                <PageRouter />

                {/* <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign in</button>
         </form> */}
                <Card />
            </div>
        </BrowserRouter>
    );
}

export default App;
