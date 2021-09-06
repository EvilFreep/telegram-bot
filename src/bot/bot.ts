import { Telegraf, session, Scenes, Markup, Context }  from 'telegraf';
import { getConfig } from '../config/config';
import MyContext from './extededContext';
import  searchScene  from './searchScene'
import { saveQuizData, parsePoll, initQuizData, showQuizData } from './funcs';
import quizScene from './quizScene';

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
    initQuizData()
    ctx.scene.enter('search')
  }
  if(ctx.match[0] == "quiz")
  {
    ctx.scene.enter('quiz')
  }
})

bot.on('poll', (ctx) => {
  const dataPoll = parsePoll(ctx)
  if(dataPoll.includes('Другое'))
  {
    ctx.reply('Распишите подробнее дургой вариант в следующем сообщении')
  }
  else
  {
    saveQuizData( dataPoll )
  }
})

bot.on('message', (ctx) => { 
  ctx.reply('Напиши /start')
})


// bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
// bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

// bot.start((ctx) => ctx.reply('supported commands: /poll /quiz'))

// bot.command('poll', (ctx) => {
// ctx.replyWithPoll('15.Укажите платформы которые должны поддерживатся', 
// ['iOS (iPhone and  iPad)', 'iPhone only', 'iPad only', 'Apple Watch',
// 'Apple TV', 'Android smartphones only', 'Android tablets only', 'Android smartphones and tablets', 'Web'], { is_anonymous: true, allows_multiple_answers: true})
// console.log( ctx.state )
// })
// bot.command('quiz', (ctx) =>
//   ctx.replyWithQuiz(
//     '2b|!2b',
//     ['True', 'False'],
//     { correct_option_id: 0 }
//   )
// )


bot.launch();