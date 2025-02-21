// Инициализация Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('planet-container').appendChild(renderer.domElement);

// Создание планеты
const planetGeometry = new THREE.SphereGeometry(5, 64, 64);
const planetTexture = new THREE.TextureLoader().load('https://i.imgur.com/planet_texture.jpg'); // Замените на вашу текстуру
const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
scene.add(planet);

// Освещение
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(10, 10, 10);
scene.add(light);

// Позиция камеры
camera.position.z = 15;

// Анимация
function animate() {
    requestAnimationFrame(animate);
    planet.rotation.y += 0.005; // Вращение планеты
    renderer.render(scene, camera);
}
animate();

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

// Переключение вкладок
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(`${tabName}-content`).style.display = 'block';
    });
});

// Обновление интерфейса
function updateUI() {
    const translation = translations[language];
    document.getElementById('collectButton').textContent = translation.collectButton;
    document.getElementById('build-stone-mine').textContent = translation.buildStoneMine;
    document.getElementById('build-energy-plant').textContent = translation.buildEnergyPlant;
    document.getElementById('build-metal-factory').textContent = translation.buildMetalFactory;
    document.getElementById('build-crystal-mine').textContent = translation.buildCrystalMine;
    document.getElementById('build-spaceport').textContent = translation.buildSpaceport;
    document.querySelector('[data-tab="resources"]').textContent = translation.resourcesTab;
    document.querySelector('[data-tab="upgrades"]').textContent = translation.upgradesTab;
    document.querySelector('[data-tab="shop"]').textContent = translation.shopTab;
    document.querySelector('[data-type="stone"]').innerHTML = `<span>🪨</span><span id="stone-count">0</span> ${translation.stone}`;
    document.querySelector('[data-type="energy"]').innerHTML = `<span>⚡</span><span id="energy-count">0</span> ${translation.energy}`;
    document.querySelector('[data-type="metal"]').innerHTML = `<span>🔩</span><span id="metal-count">0</span> ${translation.metal}`;
    document.querySelector('[data-type="crystal"]').innerHTML = `<span>💎</span><span id="crystal-count">0</span> ${translation.crystal}`;
}
