var encounters = 0;
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
    counter.innerHTML = encounters.toString();
    generatePercentages();
});
subtract.addEventListener("click", function () {
    if (encounters - 1 >= 0) {
        encounters--;
        counter.innerHTML = encounters.toString();
        generatePercentages();
    }
});
// Updating odds.
var odds = document.getElementById("odd");
odds.addEventListener("input", function () {
    generatePercentages();
});
function getBnP(n, p) {
    return 100 * (1 - Math.pow((p - 1) / p, n));
}
function element(id) {
    return document.getElementById(id);
}
function generatePercentages() {
    element("current-odd").innerHTML = (Math.round(100 * getBnP(encounters, parseInt(odds.value))) / 100).toString() + "%";
    for (var i = 10; i < 100; i += 10) {
        var s = i.toString();
        var count = 0;
        while (getBnP(count, parseInt(odds.value)) <= i) {
            count++;
        }
        element(s + "-until").innerHTML = (count - encounters).toString();
        element(s).innerHTML = count.toString();
    }
}
function setEncounters(p) {
    encounters = p;
    counter.innerHTML = encounters.toString();
    generatePercentages();
}
