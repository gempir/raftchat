import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./App";
import { StateProvider } from "./state/Store";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
