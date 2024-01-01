import React from "react";
import { useState } from "react";

export default function Tracker(props: {
    encounters: number,
    setEncounters: Function
}) {
    const [pokemon, setPokemon] = useState("regice");

    return (
        <div id="tracker">
            <div id="img-container">
                <img id="poke-img" src={"https://pokemon.night.coffee/icons/shiny/" + pokemon + ".gif"}></img>
            </div>
            <input id="poke-name" onChange={(e) => setPokemon(e.target.value.toLowerCase())}></input>

            <hr></hr>

            <input id="counter" value={props.encounters} onChange={(e) => {
                if (!parseInt(e.target.value) || parseInt(e.target.value) < 0) return;
                props.setEncounters(parseInt(e.target.value));
            }}></input>

            <div id="buttons">
                <button id="add" onClick={() => props.setEncounters(props.encounters + 1)}>+</button>
                <button id="subtract" onClick={() => {
                    if (props.encounters - 1 >= 0) {
                        props.setEncounters(props.encounters - 1);
                    }
                }}>-</button>
            </div>
        </div>
    )
}