const coinsElement = document.getElementById("coins");
const resourcesElement = document.getElementById("resources");
const collectButton = document.getElementById("collectButton");
const buildButton = document.getElementById("buildButton");
const coinAmountInput = document.getElementById("coinAmount");
const buyWithTonButton = document.getElementById("buyWithTon");
const buyWithStarsButton = document.getElementById("buyWithStars");
const inviteFriendButton = document.getElementById("inviteFriend");

const homeButton = document.getElementById("homeButton");
const donateButton = document.getElementById("donateButton");
const friendsButton = document.getElementById("friendsButton");

const homePage = document.getElementById("homePage");
const donatePage = document.getElementById("donatePage");
const friendsPage = document.getElementById("friendsPage");

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

// Подключение TON Connect
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://zixpykw321.github.io/microcosmos-app/
/tonconnect-manifest.json'
});

tonConnectUI.connectButton({
    container: document.getElementById('ton-connect-button')
});

tonConnectUI.onStatusChange((wallet) => {
    if (wallet) {
        alert("Кошелёк подключен: " + wallet.account.address);
    }
});

// Обработка покупки за TON
buyWithTonButton.addEventListener("click", () => {
    const coinAmount = parseInt(coinAmountInput.value);
    if (coinAmount < 1 || isNaN(coinAmount)) {
        alert("Минимальная сумма покупки: 1 монета.");
        return;
    }

    const tonAmount = (coinAmount / 1000).toFixed(6); // 1 TON = 1000 монет
    if (tonConnectUI.wallet) {
        const transaction = {
            to: "UQA52wXmxXaDJvuj0VEtZ_2fnfUk1STt0xSovDWxnRCmRr6u", // Замени на свой кошелёк
            value: (tonAmount * 1e9).toString() // Конвертируем TON в наноТОН
        };
        tonConnectUI.sendTransaction(transaction).then(() => {
            coins += coinAmount;
            updateUI();
            alert(`Спасибо за донат! Вы получили ${coinAmount} монет.`);
        });
    } else {
        alert("Подключите кошелёк для покупки.");
    }
});

// Обработка покупки за Telegram Stars
buyWithStarsButton.addEventListener("click", () => {
    const coinAmount = parseInt(coinAmountInput.value);
    if (coinAmount < 1 || isNaN(coinAmount)) {
        alert("Минимальная сумма покупки: 1 монета.");
        return;
    }

    const starsAmount = (coinAmount * 0.35).toFixed(2); // 350 Stars = 1000 монет
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.showPopup({
            title: "Купить монеты",
            message: `Вы хотите купить ${coinAmount} монет за ${starsAmount} Stars?`,
            buttons: [
                { id: "buy", type: "ok", text: "Купить" },
                { type: "cancel" }
            ]
        }, (buttonId) => {
            if (buttonId === "buy") {
                coins += coinAmount;
                updateUI();
                alert(`Спасибо за донат! Вы получили ${coinAmount} монет.`);
            }
        });
    }
});

// Обработка приглашения друга
inviteFriendButton.addEventListener("click", () => {
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.shareUrl({
            url: "https://t.me/MicroCosmosBot?start=ref_12345", // Замени на ссылку своего бота
            title: "Присоединяйся к MicroCosmos! 🌌"
        });
    }
});

// Переключение между разделами
homeButton.addEventListener("click", () => {
    homePage.classList.add("active");
    donatePage.classList.remove("active");
    friendsPage.classList.remove("active");
});

donateButton.addEventListener("click", () => {
    donatePage.classList.add("active");
    homePage.classList.remove("active");
    friendsPage.classList.remove("active");
});

friendsButton.addEventListener("click", () => {
    friendsPage.classList.add("active");
    homePage.classList.remove("active");
    donatePage.classList.remove("active");
});
