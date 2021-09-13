import { Telegraf, session, Scenes, Markup, Context }  from 'telegraf';
import { getConfig } from '../config/config';
import MyContext from './extededContext';
import  searchScene  from './searchScene'
import { saveQuizData, parsePoll, initQuizData, showQuizData } from './funcsSaveDataFromPoll';
import quizScene, { askAnswer, incIterator, showIterator } from './quizScene';

const config = getConfig('tlg_bot_');
const bot = new Telegraf<MyContext>(config.bot_section.bot_token);
const stage = new Scenes.Stage([searchScene, quizScene])

bot.use(session()); 
bot.use(stage.middleware());
bot.use((ctx, next) => {
  // we now have access to the the fields defined above
  ctx.myContextProp ??= ''
  return next()
})

bot.start(ctx =>{
  return ctx.reply('Привет нажми на нужную функцию ниже: ', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.callback('Поиск', 'search'),
      Markup.button.callback('Опрос', 'quiz')
    ])
  })
})

bot.action(/.+/, (ctx) => {
  if(ctx.match[0] == "search")
  {
    ctx.scene.enter('search')
  }
  if(ctx.match[0] == "quiz")
  {
    initQuizData()
    ctx.scene.enter('quiz')
  }
})

bot.on('poll', (ctx) => {
  const dataPoll = parsePoll(ctx)
  if(dataPoll.includes('Другое'))
  {
    //ctx.reply('Распишите подробнее дургой вариант в следующем сообщении')
  }
  else
  {
    saveQuizData( dataPoll )
  }
})

bot.on('message', (ctx) => { 
  ctx.reply('Напиши /start')
})

bot.launch();