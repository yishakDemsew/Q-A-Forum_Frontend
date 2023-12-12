import React from "react";
import "./App.css";
// import Homes from "./components/main/Home";
// import AllQuestions from "./components/home/AllQuestions";
import { StateProvider } from "./context/context";

function App() {
    return (
        <>
            <StateProvider />
        </>
    );
}

export default App;
