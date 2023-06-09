import "./App.scss";
import React, { useEffect, useState } from "react";

// components
import Navbar from "./components/Navbar";

// page router
import PageRouter from "./Router";

export const SignedInContext = React.createContext();

export default function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [staySignedIn, setStaySignedIn] = useState(true);

    // user signed in check
    useEffect(() => {
        checkActiveUser();
    }, [signedIn]);

    function checkActiveUser() {
        // check localStorage
        const userIsActive = window.localStorage.getItem("active_user")
            ? true
            : false;

        // if userIsActive
        if (userIsActive) {
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }

    // signout on window close
    window.addEventListener("beforeunload", () => {
        if (!staySignedIn) {
            setSignedIn(false);
            window.localStorage.removeItem("active_user");
        }
    });

    return (
        <div className="App">
            <SignedInContext.Provider value={[signedIn, setSignedIn]}>
                <Navbar />
                <PageRouter />
            </SignedInContext.Provider>
        </div>
    );
}
