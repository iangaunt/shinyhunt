import React from "react";
import { useState } from "react";

function getBnP(n: number, p: number) {
    return 100 * (1 - Math.pow((p - 1) / p, n))
}

function Odd(props: {
    color: string,
    diff: number,
    encounters: number,
    percentage: number
}) {
    let diffCalc = (props.diff - props.encounters > 0 ? props.diff - props.encounters : 0);

    return (
        <p>
            <span id={props.color}>{props.percentage + "%: "}</span>
            {diffCalc > 0 ? (diffCalc + " until") : "Passed"}
            <span id={props.percentage.toString()}> ({props.diff})</span>
        </p>
    )
}

function Percentages(props: {
    encounters: number,
    odds: number
}) {
    const colors = ["green", "yellow", "red"];
    let odds = [];
    
    for (let i = 0; i < 9; i++) {
        let diff = Math.round(Math.ceil(Math.log(1 - (i + 1) / 10) / Math.log((props.odds - 1) / props.odds)));
        odds.push(<Odd percentage={(i + 1) * 10} color={i > 5 ? "red" : (i > 2 ? "yellow" : "green")} diff={diff} encounters={props.encounters} />)
    }

    return (
        <div id="percentages">
            <h2>Current Odds: <span id="current-odd">{(Math.round(100 * getBnP(props.encounters, props.odds)) / 100).toString() + "%"}</span></h2>
            
            {odds}
        </div>
    )
}

export default function Statistics(props: {
    encounters: number
}) {
    const [odds, setOdds] = useState(4096);

    return (
        <div id="statistics">
            <h1>Summary Statistics</h1>
            <hr></hr>

            <div id="odds">
                <p><span>Odds:</span> 1 / </p>
                <input id="odd" type="number" onChange={(e) => {
                    if (!parseInt(e.target.value)) return;
                    const val: number = parseInt(e.target.value);

                    if (val < 0) return;
                    setOdds(val);
                }}></input>
            </div>

            <Percentages encounters={props.encounters} odds={odds}/>
        </div>
    )
}