let tg = window.Telegram.WebApp;
tg.ready();

// Призы с цветами для карточек
const prizes = [
    { name: "VOID", emoji: "0️⃣", chance: 30, class: "common" },
    { name: "1 STAR", emoji: "⭐", chance: 30, class: "common" },
    { name: "10 STARS", emoji: "🔟⭐", chance: 20, class: "rare" },
    { name: "GIFT", emoji: "🎁", chance: 10, class: "epic" },
    { name: "PEPE", emoji: "🐸", chance: 10, class: "legendary" }
];

let isSpinning = false;

// Создаем ленту с призами
function createReel() {
    const reel = document.getElementById('reel');
    reel.innerHTML = '';
    
    // Создаем много призов для эффекта прокрутки
    for (let i = 0; i < 20; i++) {
        prizes.forEach((prize) => {
            const item = document.createElement('div');
            item.className = `prize-item ${prize.class}`;
            item.innerHTML = `
                <div class="prize-emoji">${prize.emoji}</div>
                <div class="prize-name">${prize.name}</div>
            `;
            reel.appendChild(item);
        });
    }
}

// Выбор приза по вероятности
function selectPrize() {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (let i = 0; i < prizes.length; i++) {
        cumulative += prizes[i].chance;
        if (random < cumulative) {
            return i;
        }
    }
    return 0;
}

// Кручение рулетки
function spinSlot() {
    if (isSpinning) return;
    
    isSpinning = true;
    document.getElementById('spinBtn').disabled = true;
    
    const reel = document.getElementById('reel');
    const prizeIndex = selectPrize();
    
    // Рассчитываем позицию
    const itemWidth = 135; // ширина элемента + gap
    const itemsPerBlock = prizes.length;
    const targetPosition = prizeIndex * itemWidth;
    
    // Проедем несколько "кругов"
    const spinDistance = itemsPerBlock * 20 * itemWidth + targetPosition;
    
    reel.style.transform = `translateX(-${spinDistance}px)`;
    
    // Показываем результат
    setTimeout(() => {
        showWinModal(prizeIndex);
        isSpinning = false;
        document.getElementById('spinBtn').disabled = false;
        
        // Возвращаем в начало (с небольшой задержкой)
        setTimeout(() => {
            reel.style.transform = 'translateX(0px)';
        }, 500);
        
        // Отправляем результат в Telegram
        tg.sendData(JSON.stringify({
            action: "spin_result",
            prize: prizes[prizeIndex].name,
            emoji: prizes[prizeIndex].emoji
        }));
    }, 2000);
}

// Показываем модальное окно
function showWinModal(prizeIndex) {
    const modal = document.getElementById('winModal');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const winMessage = document.getElementById('winMessage');
    const prize = prizes[prizeIndex];
    
    prizeDisplay.innerHTML = prize.emoji;
    
    // Меняем цвет сообщения в зависимости от редкости
    if (prize.class === 'legendary') {
        winMessage.style.color = '#ff0000';
        winMessage.style.textShadow = '0 0 20px #ff0000';
    } else if (prize.class === 'epic') {
        winMessage.style.color = '#ffff00';
        winMessage.style.textShadow = '0 0 20px #ffff00';
    } else if (prize.class === 'rare') {
        winMessage.style.color = '#ff00ff';
        winMessage.style.textShadow = '0 0 20px #ff00ff';
    } else {
        winMessage.style.color = '#00ffff';
        winMessage.style.textShadow = '0 0 20px #00ffff';
    }
    
    modal.style.display = 'flex';
}

// Закрываем модальное окно
function closeModal() {
    document.getElementById('winModal').style.display = 'none';
}

// Возврат на главную
function goBack() {
    window.location.href = 'game.html';
}

// Инфо (можно добавить позже)
function showInfo() {
    tg.showAlert('🎰 SPIN TO WIN 🎰\n\n5x MULTI SLOT\n\nRATES:\nVOID: 30%\n1⭐: 30%\n10⭐: 20%\nGIFT: 10%\nPEPE: 10%');
}

// Инициализация
createReel();

// Приветствие
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let user = tg.initDataUnsafe.user;
    document.getElementById('userName').innerText = user.first_name;
    document.getElementById('greeting').innerText = `LUCKY SPIN`;
}