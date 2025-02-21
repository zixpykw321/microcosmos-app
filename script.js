// Ресурсы
const resources = {
    stone: 0,
    energy: 0,
    metal: 0,
    crystal: 0,
};

// Здания
const buildings = {
    stoneMine: false,
    energyPlant: false,
    metalFactory: false,
    crystalMine: false,
    spaceport: false,
};

// Прогресс заполнения планеты
let planetProgress = 0;

// Обновление прогресса
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    progressFill.style.width = `${planetProgress}%`;
    progressText.textContent = `${planetProgress}%`;
}

// Логика постройки зданий
document.getElementById('build-stone-mine').addEventListener('click', () => {
    if (resources.stone >= 100) {
        resources.stone -= 100;
        buildings.stoneMine = true;
        planetProgress += 10; // Каждое здание добавляет 10% к прогрессу
        updateProgress();
        updateUI();
        alert("Шахта камня построена!");
    } else {
        alert("Недостаточно камней!");
    }
});

// Логика сбора ресурсов
let lastCollectionTime = 0;
document.getElementById('collectButton').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastCollectionTime < 3600000) {
        alert("Собирать можно только 1 раз в час!");
        return;
    }
    if (buildings.stoneMine) resources.stone += 1;
    if (buildings.energyPlant) resources.energy += 1;
    if (buildings.metalFactory) resources.metal += 1;
    if (buildings.crystalMine) resources.crystal += 1;
    updateUI();
    lastCollectionTime = now;
});

// Обновление интерфейса
function updateUI() {
    document.getElementById('stone-count').textContent = resources.stone;
    document.getElementById('energy-count').textContent = resources.energy;
    document.getElementById('metal-count').textContent = resources.metal;
    document.getElementById('crystal-count').textContent = resources.crystal;
}
