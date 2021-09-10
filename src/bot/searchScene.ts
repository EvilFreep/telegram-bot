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
  // await axios.get("http://localhost:3001/projects?filter=hi&order=ASC&page=1&perPage=10&sort=id").then( 
  //   data => {
  //     const searchData = data.data;
  //     console.log(searchData)
  //   }).catch()
  const data = await axios.get('http://localhost:3001/projects?filter=":"pech&order=ASC&page=1&perPage=10&sort=id')
  console.log(data)
});

export default searchScene;
