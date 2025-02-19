const coinsElement = document.getElementById("coins");
const resourcesElement = document.getElementById("resources");
const collectButton = document.getElementById("collectButton");
const buildButton = document.getElementById("buildButton");

let coins = 0;
let resources = 0;

function updateUI() {
    coinsElement.textContent = coins;
    resourcesElement.textContent = resources;
}

collectButton.addEventListener("click", () => {
    resources += 1;
    updateUI();
});

buildButton.addEventListener("click", () => {
    if (resources >= 5) {
        resources -= 5;
        coins += 10;
        updateUI();
    } else {
        alert("Недостаточно ресурсов!");
    }
});
