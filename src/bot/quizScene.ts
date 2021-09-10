import { Telegraf, Scenes, Markup, Context}  from 'telegraf';
import { callback, pollRequest } from 'telegraf/typings/button';
import { inlineKeyboard } from 'telegraf/typings/markup';
import { BaseScene, Stage } from 'telegraf/typings/scenes';
import { createTextChangeRange, NumericLiteral } from 'typescript';
import MyContext from './extededContext'
import { saveQuizData, showQuizData, sendQuizDataOnServer } from './funcsSaveDataFromPoll';

const { enter, leave } = Scenes.Stage
const numOfQ: number = 3
let i: number = 1;

export function incIterator() {
  i++;
}

export function showIterator(): number {
  return i;
}

 export function askAnswer(i: number, ctx: MyContext) {
  switch (i) {
    case 1:
    {
      ctx.reply('2.Как называется ваша компания?');
      break;
    }
    case 2:
    {
      ctx.reply('3.Расскажите о своей компании (сегмент рынка, основной фокус, адрес сайта)');
      break;     
    }
    case 3:
    {
      ctx.reply('4.Это ваш первый проекст?');
      break;     
    }
    case 4:
    {
      ctx.reply('5.Приходилось ли Вам работать с внешней командой разработчиков/агентством ранее?');
      break;     
    }
    case 5:
    {
      ctx.reply('6.Что вам понравилось и не понравилось?');
      break;     
    }
    case 6:
    {
      ctx.reply('7.Ищете ли Вы  подрядчика на разовый проект или планируется долгосрочное партнерство по развитию этого и прочих проектов?');
      break;     
    }
    case 7:
    {
      ctx.reply('8.Каковы решающие факторы/критерии при выборе подрядчика? (Этот вопрос можно пропустить нажав кнопку ниже)', 
      Markup.inlineKeyboard([Markup.button.callback('Пропустить', 'skipQ')], ));
      break;     
    }
    case 8:
    {
      ctx.reply('9.Кто будет основным контактным лицом в работе над проектом с вашей стороны?');
      break;     
    }
    case 9:
    {
      ctx.reply('10.Кто будет принимать решения по проекту во время работы?');
      break;     
    }
    case 10:
    {
      ctx.reply('11.Опишите основную функциональность проекта?');
      break;     
    }
    case 11:
    {
      ctx.reply('12.Какую проблему будет решать продукт?');
      break;     
    }
    case 12:
    {
      ctx.reply('13.Кто его целевая аудитория?');
      break;     
    }
    case 13:
    {
      ctx.replyWithPoll('14.Укажите платформы которые должны поддерживатся', 
      ['iOS (iPhone and  iPad)', 'iPhone only', 'iPad only', 'Apple Watch',
    'Apple TV', 'Android smartphones only', 'Android tablets only', 'Android smartphones and tablets', 'Web', 'Другое'], { is_anonymous: true, allows_multiple_answers: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;     
    }
    case 14:
    {
      ctx.replyWithPoll('15.Есть ли какая-либо документация (ТЗ, спецификации, макеты экранов, интерактивный прототип)?', ['Да', 'Нет', 'Другое'], { is_anonymous: true });
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;     
    }
    case 15:
    {
      ctx.reply('16.Если есть, то могли бы Вы предоставить файлы для ознакомления? (пожалуйста, укажите ссылку на файлы)');
      break;     
    }
    case 16:
    {
      ctx.replyWithPoll('17.Укажите версии ОС, которые должны поддерживаться',
       ['IOS 8+', 'Andriod 4+', 'Другое'],
        { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;     
    }
    case 17:
    {
      ctx.reply('18.Перечислите ссылки на подобные проекты, существующие на рынке.');
      break;     
    }
    case 18:
    {
      ctx.reply('19.Укажите какие на ваш взгляд у них приемущества и недостатки.');
      break;     
    }
    case 19:
    {
      ctx.reply('20.Какие конкурентные приемущества будут у вашего проекта?');
      break;     
    }
    case 20:
    {
      ctx.replyWithPoll('21.Будет ли предоставляться дизайн, или его необходимо создать с нуля?',
       ['Нет, нам нужно создать дизайн с нуля',
        'У нас есть иконки приложения',
        'У нас есть окончательный дизайн',
        'Другое'],
        { is_anonymous: true});
        ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
        break;
    }
    case 21:
    {
      ctx.replyWithPoll('22.Будет ли приложение включать фоновую музыку и звуки?',
        ['Да', 'Нет',
        'Да, и Клиент предоставит аудио файлы',
        'Да, Клиенту необходимо, чтобы они были созданы как часть этого заказа',
        'Пока не уверен',
        'Другое'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 22:
    {
      ctx.reply('23.Будет ли приложение многоязычным? Какие языки оно должно поддерживать?', Markup.inlineKeyboard([Markup.button.callback('Пропустить', 'skipQ')]));
      break;
    }
    case 23:
    {
      ctx.replyWithPoll('24.Какую модель монетизации будет использовать приложение?',
        ['Платное', 'Бесплатное',
        'Будет включать в себя покупки в приложении',
        'Еще не знаю',
        'Другое'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 24:
    {
      ctx.replyWithPoll('25.Будет ли серверная часть, панель администратора?',
        ['Да', 'Нет',
        'Другое'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 25:
    {
      ctx.replyWithPoll('26.Если да, то будет ли предоставляться бэкэнд, API?',
        ['Да', 'Нет'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 26:
    {
      ctx.replyWithPoll('27.Пожалуйста, укажите режим экрана, который будет поддерживаться в приложении.',
        ['Портрет', 'Пейзаж',
        'Портретный и Пейзаж'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 27:
    {
      ctx.replyWithPoll('28.Нужна ли вам помощь при публикации в AppStore / Google Play?',
        ['Ды', 'Нет',
        'Другое'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 28:
    {
      ctx.reply('29.Предполагаемая дата старта разработки');
      break;     
    }
    case 29:
    {
      ctx.reply('30.Предполагаемая дата релиза');
      break;     
    }
    case 30:
    {
      ctx.replyWithPoll('31.Выделенный бюджет',
        ['до 1 млн. руб.',
        '1 млн. руб. - 3 млн. руб.',
        '3 млн. руб. - 6 млн. руб.',
        '6 млн. руб. - 10 млн. руб.',
        '10 млн. руб. - 15 млн. руб.',
        '15 млн. руб. +'],
      { is_anonymous: true});
      ctx.reply('Нажмите на кнопку ниже когда ответите', Markup.inlineKeyboard([Markup.button.callback('Я ответил', 'answer')], ));
      break;
    }
    case 31:
    {
      ctx.reply('32.Прочие комментарии/ нюансы, которые должна учитывать команда');
      break;     
    }
  }
}

const quizScene = new Scenes.BaseScene<MyContext>('quiz')
//quizScene.use(Telegraf.log())

quizScene.on('poll', (ctx) => ctx.reply('Poll update'))
quizScene.on('poll_answer', (ctx) => {
  //quizInfo.push(ctx.pollAnswer)
  ctx.reply('poll answer ')
  //askAnswer(i, ctx)
  i += 1
})

quizScene.enter( async (ctx) => {
  await ctx.reply('Здесь представлен опрос. Для возвращения на главный экран напишите /back ')
  await ctx.reply('Пожалуйста, расскажите более подробно о себе и своем проекте, чтобы мы могли подготовить максимально адаптированное предложение  для вас.')
  await ctx.reply('1.Ваша электронная почта')
  i = 1;
})

quizScene.leave((ctx) => { 
  ctx.reply('exiting to main') 
})

quizScene.command('back', leave<MyContext>())

quizScene.on('text', (ctx) => {
  if (i < 32) {
    saveQuizData( ctx.message.text )
    askAnswer(i, ctx)
    i += 1
  } else {
    ctx.reply("Спасибо за участие в опросе!")
    saveQuizData( ' ' )
    if(sendQuizDataOnServer())
    {
      ctx.reply('Ваш голос учтен!')
    } else {
      ctx.reply('что то пошло не так')
    }
  }
})

quizScene.action('answer', (ctx) => {
  askAnswer(i, ctx)
  i += 1
  ctx.editMessageText('Спасибо!')
})

quizScene.action('skipQ', (ctx) => {
  saveQuizData('')
  askAnswer(i, ctx)
  i += 1
  ctx.editMessageText('Пропущено!')
})
// const quizScene = new Scenes.BaseScene<MyContext>('quiz')

// quizScene.enter((ctx) => ctx.reply('supported commands: /poll /quiz'))
// quizScene.leave((ctx) => { 
//   ctx.reply('exiting to main') 
// })

// quizScene.command('back', (ctx) => {
//   leave<MyContext>()
// })

// quizScene.command('poll', (ctx) => {
//   let a = ctx.replyWithPoll(
//     'Your favorite math constant',
//     ['x', 'e', 'π', 'φ', 'γ'],
//     { is_anonymous: true }
//   )
//   console.log(a)
// })

// quizScene.on('poll', (ctx) => { 
//   console.log('Poll update', ctx.poll)
// })
// quizScene.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

// quizScene.command('quiz', (ctx) =>
//   ctx.replyWithQuiz(
//     '2b|!2b',
//     ['True', 'False'],
//     { correct_option_id: 0 }
//   )
// )

// quizScene.on('text', (ctx) => {
//   ctx.reply('inn scene')
// })

export default quizScene;