import { Telegraf, Scenes }  from 'telegraf';
import { BaseScene, Stage } from 'telegraf/typings/scenes';
import MyContext from './extededContext';
import axios from 'axios';

const { enter, leave } = Scenes.Stage;
const searchScene = new Scenes.BaseScene<MyContext>('search');
searchScene.use(Telegraf.log());
searchScene.enter( async (ctx) => { 
  return await ctx.reply('Напишите свой запрос, для возвращения на главный экран напишите /back');
});
searchScene.leave((ctx) => { 
  ctx.reply('exiting to main');
  
});
searchScene.command('back', leave<MyContext>())
searchScene.on('text', async (ctx) =>
{
  axios.post("http://localhost:3001/api/", ctx.message.text)
});

export default searchScene;
