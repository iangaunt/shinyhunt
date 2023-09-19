let encounters: number = 0;
let currentOdds: number = 0;
const rolls: Array<number> = [];

// Displaying images for the chosen Pokemon.
const poke_name = <HTMLInputElement> document.getElementById("poke-name");

poke_name.addEventListener("input", function() {
    const img: HTMLImageElement = <HTMLImageElement> document.getElementById("poke-img");
    img.src = "https://pokemon.night.coffee/icons/shiny/" + poke_name.value.toLowerCase() + ".gif";
});

// Updating counters.
const counter = <HTMLInputElement> document.getElementById("counter");
const add = <HTMLButtonElement> document.getElementById("add");
const subtract = <HTMLButtonElement> document.getElementById("subtract");

/** Adds an encounter to our counter and updates the percentages. */
function addEncounter() {
    encounters++;
    counter.value = encounters.toString();
    generatePercentages();
}

/** Subtracts an encounter to our counter and updates the percentages. */
function subtractEncounter() {
    if (encounters - 1 >= 0) {
        encounters--;
        counter.value = encounters.toString();
        generatePercentages();
    }
}

add.addEventListener("click", addEncounter);
subtract.addEventListener("click", subtractEncounter);

document.addEventListener("keydown", function(e) {
    if (e.key == " " || e.code == "Space") {
        addEncounter();
    } else if (e.key == "Backspace" || e.code == "Backspace") {
        subtractEncounter();
    }
})

// Allows for the manual updating of the counter.
counter.addEventListener("input", function() {
    if (!parseInt(counter.value) || parseInt(counter.value) < 0) return;
    encounters = parseInt(counter.value);
    generatePercentages();
});

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

    // Updates the percentage board with the new levels of B(n, p).
    if (currentOdds != parseInt(odds.value)) {
        currentOdds = parseInt(odds.value);

        // ln (1 - i / 10) / ln (p - 1 / current), where p is the current odds, will give
        // us the amount of rolls it will take to reach the ith percentile.
        for (let i = 1; i < 10; i++) {
            rolls[i] = Math.round(
                Math.ceil(Math.log(1 - i / 10) / Math.log((currentOdds - 1) / currentOdds))
            );
        }
    }

    // Add all of the encounters (and encounters needed) to the percentage board.
    for (let i = 10; i < 100; i += 10) {
        const s: string = i.toString();
        const diff = rolls[i / 10];

        element(s + "-until").innerHTML = (diff - encounters > 0 ? diff - encounters : 0).toString();
        element(s).innerHTML = "(" + diff + ")";
    }
}

// Initialize the counter with 0 resets.
let interval = null;
interval = setInterval(function() {
    if (document.readyState == "complete") {
        counter.value = "0";
        clearInterval(interval);
    }
}, 100)
