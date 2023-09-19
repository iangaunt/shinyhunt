var encounters = 0;
var currentOdds = 0;
var rolls = [];
// Displaying images for the chosen Pokemon.
var poke_name = document.getElementById("poke-name");
poke_name.addEventListener("input", function () {
    var img = document.getElementById("poke-img");
    img.src = "https://pokemon.night.coffee/icons/shiny/" + poke_name.value.toLowerCase() + ".gif";
});
// Updating counters.
var counter = document.getElementById("counter");
var add = document.getElementById("add");
var subtract = document.getElementById("subtract");
add.addEventListener("click", function () {
    encounters++;
    counter.value = encounters.toString();
    generatePercentages();
});
document.addEventListener("keydown", function (e) {
    if (e.key == " " || e.code == "Space") {
        encounters++;
        counter.value = encounters.toString();
        generatePercentages();
    }
});
subtract.addEventListener("click", function () {
    if (encounters - 1 >= 0) {
        encounters--;
        counter.value = encounters.toString();
        generatePercentages();
    }
});
counter.addEventListener("input", function () {
    if (!parseInt(counter.value) || parseInt(counter.value) < 0)
        return;
    encounters = parseInt(counter.value);
    generatePercentages();
});
// Updating odds.
var odds = document.getElementById("odd");
odds.addEventListener("input", function () {
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
function getBnP(n, p) {
    return 100 * (1 - Math.pow((p - 1) / p, n));
}
/**
 * Returns the HTML element with the specified id. Functionally
 * does the same as document.getElementById but without so many
 * keystrokes.
 *
 * @param id - The id of the element.
 * @returns - The HTML element with the specified id.
 */
function element(id) {
    return document.getElementById(id);
}
/**
 * Generates the percentages of B(n, p) reaching 10% to 90% and displays them to
 * the user, updating them based on how far the user is from those percentiles.
 */
function generatePercentages() {
    if (!parseInt(odds.value))
        return;
    if (parseInt(odds.value) < 1)
        return;
    if (rolls.length == 0) {
        for (var i = 0; i < 10; i++) {
            rolls.push(0);
        }
    }
    element("current-odd").innerHTML = (Math.round(100 * getBnP(encounters, parseInt(odds.value))) / 100).toString() + "%";
    if (currentOdds != parseInt(odds.value)) {
        var count = 0;
        var i = 10;
        while (true) {
            if (i == 100)
                break;
            if (getBnP(count, parseInt(odds.value)) > i) {
                rolls[i / 10 - i] = count;
                i += 10;
            }
            count++;
        }
    }
    for (var i = 10; i < 100; i += 10) {
        var s = i.toString();
        var diff = rolls[i / 10 - i];
        element(s + "-until").innerHTML = (diff - encounters).toString();
        element(s).innerHTML = "(" + diff.toString() + ")";
    }
}
// Sets the encounters for the current hunt. Can be run in the terminal.
function setEncounters(p) {
    encounters = p;
    counter.innerHTML = encounters.toString();
    generatePercentages();
}
