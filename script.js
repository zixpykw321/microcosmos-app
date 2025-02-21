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

// Язык (по умолчанию русский)
let language = 'ru';

// Обновление прогресса
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    progressFill.style.width = `${planetProgress}%`;
    progressText.textContent = `${planetProgress}%`;
}

// Кастомное уведомление
function showAlert(message) {
    const alert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alert.style.display = 'block';
}

document.getElementById('alert-close').addEventListener('click', () => {
    document.getElementById('custom-alert').style.display = 'none';
});

// Логика постройки зданий
document.getElementById('build-stone-mine').addEventListener('click', () => {
    if (resources.stone >= 100) {
        resources.stone -= 100;
        buildings.stoneMine = true;
        planetProgress += 10; // Каждое здание добавляет 10% к прогрессу
        updateProgress();
        updateUI();
        showAlert(language === 'ru' ? "Шахта камня построена!" : "Stone mine built!");
    } else {
        showAlert(language === 'ru' ? "Недостаточно камней!" : "Not enough stone!");
    }
});

// Логика сбора ресурсов
let lastCollectionTime = 0;
document.getElementById('collectButton').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastCollectionTime < 3600000) {
        showAlert(language === 'ru' ? "Собирать можно только 1 раз в час!" : "You can collect only once per hour!");
        return;
    }
    if (buildings.stoneMine) resources.stone += 1;
    if (buildings.energyPlant) resources.energy += 1;
    if (buildings.metalFactory) resources.metal += 1;
    if (buildings.crystalMine) resources.crystal += 1;
    updateUI();
    lastCollectionTime = now;
});

// Смена языка
document.getElementById('switch-language').addEventListener('click', () => {
    language = language === 'ru' ? 'en' : 'ru';
    updateUI();
});

// Обновление интерфейса
function updateUI() {
    document.getElementById('stone-count').textContent = resources.stone;
    document.getElementById('energy-count').textContent = resources.energy;
    document.getElementById('metal-count').textContent = resources.metal;
    document.getElementById('crystal-count').textContent = resources.crystal;

    // Обновление текста в зависимости от языка
    if (language === 'ru') {
        document.getElementById('collectButton').textContent = "Собрать";
        document.getElementById('build-stone-mine').textContent = "Построить";
        document.getElementById('build-energy-plant').textContent = "Построить";
        document.getElementById('build-metal-factory').textContent = "Построить";
        document.getElementById('build-crystal-mine').textContent = "Построить";
        document.getElementById('build-spaceport').textContent = "Построить";
    } else {
        document.getElementById('collectButton').textContent = "Collect";
        document.getElementById('build-stone-mine').textContent = "Build";
        document.getElementById('build-energy-plant').textContent = "Build";
        document.getElementById('build-metal-factory').textContent = "Build";
        document.getElementById('build-crystal-mine').textContent = "Build";
        document.getElementById('build-spaceport').textContent = "Build";
    }
}
