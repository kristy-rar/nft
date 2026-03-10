// Получаем объект WebApp от Telegram
let tg = window.Telegram.WebApp;
tg.ready();

// Приветствуем игрока
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let user = tg.initDataUnsafe.user;
    document.getElementById('greeting').innerText = `${user.first_name}, выбери свою NFT!`;
}

// Функция выбора NFT
function chooseNFT(nftId) {
    let nftName = '';
    if (nftId === '1') nftName = 'Bored Ape';
    if (nftId === '2') nftName = 'Crypto Punk';
    if (nftId === '3') nftName = 'Cool Cat';
    
    // Отправляем выбор боту
    tg.sendData(JSON.stringify({
        action: "choose_nft",
        nft_id: nftId,
        nft_name: nftName
    }));
    
    // Показываем сообщение
    tg.showAlert(`Ты выбрал: ${nftName}! Ебать ты лудоман! 🎲`);
    
    // Через секунду возвращаемся на главную
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Функция возврата на главную
function goBack() {
    window.location.href = 'index.html';
}

// Следим за темой
tg.onEvent('themeChanged', function() {
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
    document.body.style.color = tg.themeParams.text_color || '#000000';
});