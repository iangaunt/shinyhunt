import React from "react";
import { useState } from "react";

import Statistics from "./Statistics";
import Tracker from "./Tracker";

let enc: number = 0;
let setEnc: Function = null;

document.addEventListener("keydown", function(e) {
    if (e.key == " " || e.code == "Space") {
        setEnc(enc + 1);
    } else if (e.key == "Backspace" || e.code == "Backspace") {
        if (enc - 1 >= 0) {
            setEnc(enc - 1);
        }
    }
})

export default function Counter() {
    const [encounters, setEncounters] = useState(0);
    enc = encounters;
    if (setEnc == null) {
        setEnc = setEncounters;
    }
    
    return (
        <div className="container" onKeyDown={(e) => {
            if (e.key == " " || e.code == "Space") {
                setEncounters(encounters + 1);
            } else if (e.key == "Backspace" || e.code == "Backspace") {
                if (encounters - 1 >= 0) {
                    setEncounters(encounters - 1);
                }
            }
        }}>
            <Tracker encounters={encounters} setEncounters={setEncounters} />
            <Statistics encounters={encounters} />
        </div>
    )
}