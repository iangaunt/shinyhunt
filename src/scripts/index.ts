let encounters: number = 0;
let currentOdds: number = 0;
let rolls: Array<number> = [];

// Displaying images for the chosen Pokemon.
const poke_name = <HTMLInputElement> document.getElementById("poke-name");

poke_name.addEventListener("input", function() {
    const img: HTMLImageElement = <HTMLImageElement> document.getElementById("poke-img");
    img.src = "https://pokemon.night.coffee/icons/shiny/" + poke_name.value.toLowerCase() + ".gif";
});

// Updating counters.
const counter = document.getElementById("counter");
const add = <HTMLButtonElement> document.getElementById("add");
const subtract = <HTMLButtonElement> document.getElementById("subtract");

add.addEventListener("click", function() {
    encounters++;
    counter.innerHTML = encounters.toString();
    generatePercentages();
})

document.addEventListener("keydown", function(e) {
    if (e.key == " " || e.code == "Space") {
        encounters++;
        counter.innerHTML = encounters.toString();
        generatePercentages();
    }
})

subtract.addEventListener("click", function() {
    if (encounters - 1 >= 0) {
        encounters--;
        counter.innerHTML = encounters.toString();
        generatePercentages();
    }
})

// Updating odds.
const odds = <HTMLInputElement> document.getElementById("odd");
odds.addEventListener("input", function() {
    generatePercentages();
});

/**
 * Generates the binomial distribution of B(n, p), where n is the
 * number of rolls while p is the odds of a certain event occuring.
 * 
 * @param n - The number of rolls.
 * @param p - The odds of a certain event occuring.
 * @returns - The binomial distribution of B(n, p), expressed as a number from 1 - 100.
 */
function getBnP(n: number, p: number) {
    return 100 * (1 - Math.pow((p - 1) / p, n))
}
/**
 * Returns the HTML element with the specified id. Functionally
 * does the same as document.getElementById but without so many
 * keystrokes.
 * 
 * @param id - The id of the element.
 * @returns - The HTML element with the specified id.
 */
function element(id: string): HTMLElement { 
    return document.getElementById(id); 
}

/**
 * Generates the percentages of B(n, p) reaching 10% to 90% and displays them to 
 * the user, updating them based on how far the user is from those percentiles.
 */
function generatePercentages() {
    if (!parseInt(odds.value)) return;
    if (parseInt(odds.value) < 1) return;
    
    if (rolls.length == 0) {
        for (let i = 0; i < 10; i++) {
            rolls.push(0);
        }
    }
    element("current-odd").innerHTML = (Math.round(100 * getBnP(encounters, parseInt(odds.value))) / 100).toString() + "%";

    if (currentOdds != parseInt(odds.value)) {
        let count = 0;
        let i = 10;

        while (true) {
            if (i == 100) break;
            if (getBnP(count, parseInt(odds.value)) > i) {
                rolls[i / 10 - i] = count;
                i += 10;
            }
            count++;
        }
    }

    for (let i = 10; i < 100; i += 10) {
        const s: string = i.toString();
        const diff = rolls[i / 10 - i];

        element(s + "-until").innerHTML = (diff - encounters).toString();
        element(s).innerHTML = "(" + diff.toString() + ")";
    }
}

// Sets the encounters for the current hunt. Can be run in the terminal.
function setEncounters(p: number) {
    encounters = p;
    counter.innerHTML = encounters.toString();
    generatePercentages();
}