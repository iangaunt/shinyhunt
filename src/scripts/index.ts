let encounters: number = 0;

// Displaying images for the chosen Pokemon.
const poke_name = <HTMLInputElement> document.getElementById("poke-name");

poke_name.addEventListener("input", function() {
    let img: HTMLImageElement = <HTMLImageElement> document.getElementById("poke-img");
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

function getBnP(n: number, p: number) {
    return 100 * (1 - Math.pow((p - 1) / p, n))
}
function element(id: string): HTMLElement { 
    return document.getElementById(id); 
}

// Generates the percentages for the encounter B(n, p).
function generatePercentages() {
    element("current-odd").innerHTML = (Math.round(100 * getBnP(encounters, parseInt(odds.value))) / 100).toString() + "%";
    for (let i = 10; i < 100; i += 10) {
        let s: string = i.toString();
        let count = 0;

        while (getBnP(count, parseInt(odds.value)) <= i) {
            count++;
        }
        element(s + "-until").innerHTML = (count - encounters).toString();
        element(s).innerHTML = count.toString();
    }
}

// Sets the encounters for the current hunt. Can be run in the terminal.
function setEncounters(p: number) {
    encounters = p;
    counter.innerHTML = encounters.toString();
    generatePercentages();
}