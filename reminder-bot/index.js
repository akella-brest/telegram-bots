var TelegramBot = require('../node_modules/node-telegram-bot-api');

var token = '453381712:AAHqB0XPmLMkzigVSAqguHUrEJN2aZHGQXM';

var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/\/start/, function (msg, match) {
    bot.sendMessage(msg.from.id, `${msg.from.first_name}, привет, я бот-напоминальщик! Вводи в формате "Напомни что-то в 23:55" и я тебе напомню`);
});

bot.onText(/Напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push( { 'uid': userId, 'time': time, 'text': text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно постараюсь напомнить ;)');
});

setInterval (function() {
    for(var i = 0; i < notes.length; i++) {
        var curDate = (new Date().getHours() + 3) + ':' + new Date().getMinutes();
        if(notes[i]['time'] == curDate){
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.');
            notes.splice(i, 1);
        }
    }
}, 1000);