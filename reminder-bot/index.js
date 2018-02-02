var TelegramBot = require('../node_modules/node-telegram-bot-api');

var token = '453381712:AAHqB0XPmLMkzigVSAqguHUrEJN2aZHGQXM';

var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/\/start/, function (msg, match) {
    bot.sendMessage(msg.from.id, `${msg.from.first_name}, привет, я бот-напоминальщик! Вводи в формате "Напомни что-то в 23:55" и я тебе напомню`);
});

bot.onText(/Напомни (.+) в (.+)/i, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push( { 'uid': userId, 'time': time, 'text': text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно постараюсь напомнить ;)');
});

setInterval (function() {
    for(var i = 0; i < notes.length; i++) {
        var hours = (new Date().getUTCHours() + 3) < 10 ? '0' + (new Date().getUTCHours() + 3) : (new Date().getUTCHours() + 3);
        var minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();

        hours = hours >= 24 ? hours - 24 : hours;

        var curDateDot = hours + '.' + minutes;
        var curDate = hours + ':' + minutes;
        console.log(curDateDot, curDate);

        if(notes[i]['time'] == curDate || notes[i]['time'] == curDateDot) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.');
            notes.splice(i, 1);
        }
    }
}, 1000);