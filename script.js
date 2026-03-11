let tg = window.Telegram.WebApp;
tg.ready();

// Функция для начала игры (переход на вторую страницу)
function startGame() {
    window.location.href = 'game.html';
}

// Приветствуем пользователя
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let user = tg.initDataUnsafe.user;
    document.getElementById('greeting').innerText = `Здарова, ${user.first_name}!`;
}

// Следим за темой
tg.onEvent('themeChanged', function() {
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
    document.body.style.color = tg.themeParams.text_color || '#000000';
});