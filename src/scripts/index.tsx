import "../css/style.css";

import React from "react";
import { createRoot } from "react-dom/client";

import Counter from "./components/Counter"

/** Builds the screen with the shiny tracker and statistics bar. */
const root = createRoot(document.getElementById("main"))
root.render((
    <Counter />
));

