// Инициализация Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('planet-container').appendChild(renderer.domElement);

// Создание планеты
const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
const planetTexture = new THREE.TextureLoader().load('https://i.imgur.com/XYZ1234.png'); // Замени на текстуру планеты
const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
scene.add(planet);

// Освещение
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Позиция камеры
camera.position.z = 15;

// Анимация вращения планеты
function animate() {
    requestAnimationFrame(animate);
    planet.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Обработка событий
const coinsElement = document.getElementById("coins");
const resourcesElement = document.getElementById("resources");
const collectButton = document.getElementById("collectButton");
const buildButton = document.getElementById("buildButton");
const donateButton = document.getElementById("donateButton");
const inviteFriendButton = document.getElementById("inviteFriend");

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

// Донат через TON
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://ваш-сайт/tonconnect-manifest.json'
});

donateButton.addEventListener("click", () => {
    if (tonConnectUI.wallet) {
        const transaction = {
            to: "ВАШ_TON_КОШЕЛЁК", // Замени на свой кошелёк
            value: "1000000000" // 1 TON в наноТОН
        };
        tonConnectUI.sendTransaction(transaction).then(() => {
            coins += 1000; // Игрок получает 1000 монет
            updateUI();
            alert("Спасибо за донат! Вы получили 1000 монет.");
        });
    } else {
        alert("Подключите кошелёк для доната.");
    }
});

// Реферальная система
inviteFriendButton.addEventListener("click", () => {
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.shareUrl({
            url: "https://t.me/ВАШ_БОТ_USERNAME?start=ref_12345", // Замени на ссылку своего бота
            title: "Присоединяйся к MicroCosmos! 🌌"
        });
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
