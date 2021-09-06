import { Telegraf, Scenes }  from 'telegraf';
import { BaseScene, Stage } from 'telegraf/typings/scenes';
import MyContext from './extededContext';
import { httpclient } from 'typescript-http-client'
import Response = httpclient.Response
import Request = httpclient.Request

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
  const client = httpclient.newHttpClient();
  const request = new Request('https://jsonplaceholder.typicode.com/todos/1', { responseType: 'text' });
  const responseBody = await client.execute<string>(request);
});

export default searchScene;
