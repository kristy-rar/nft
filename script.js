// Получаем объект WebApp от Telegram
let tg = window.Telegram.WebApp;

// Сообщаем Telegram, что приложение готово
tg.ready();

// Функция для отправки данных боту
function sendData() {
    tg.sendData(JSON.stringify({
        action: "button_clicked",
        message: "Пользователь нажал кнопку!"
    }));
    tg.showAlert("Данные отправлены!");
}

// Приветствуем пользователя по имени
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let user = tg.initDataUnsafe.user;
    document.getElementById('greeting').innerText = `Здарова, ${user.first_name}!`;
}

// Следим за сменой темы в Telegram
tg.onEvent('themeChanged', function() {
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
    document.body.style.color = tg.themeParams.text_color || '#000000';
});