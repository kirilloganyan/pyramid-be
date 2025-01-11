const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, {polling: true});


    bot.setMyCommands([{command: '/start', description: 'Запустить приложение'}])
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === '/start') {
            return bot.sendMessage(chatId, 'Текст',{
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Залетай деньги отдавай', web_app: {url: 'https://tg-mini-app-beryl.vercel.app/ '}}]
                    ]
                }
            });
        }
        if(text === '/info') {
            return  bot.sendMessage(chatId, 'привет, ты лох');
                            }
        return bot.sendMessage(chatId,'Неизвестная команда')
    })
