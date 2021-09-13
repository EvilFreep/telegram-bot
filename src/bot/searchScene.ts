import { Telegraf, Scenes }  from 'telegraf';
import { BaseScene, Stage } from 'telegraf/typings/scenes';
import MyContext from './extededContext';
import axios from 'axios';
import Project from './SearchProject';


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
  const data = await axios.get('http://localhost:3001/projects?filter={"project_name":"'+ ctx.message.text +'"}&order=ASC&page=1&perPage=10&sort=id')
  const project:Project = data.data[0];
  
  if (project !== undefined) {
    ctx.reply('Результат поиска: \n Название проекта: ' + project.project_name + '\n' +
              'Отрасль: ' + project.otrasl + '\n' +
              'Состояние продукта: ' + project.state_of_project + '\n' +
              'NDA: ' + project.nda + '\n' +
              'Бюджет: ' + project.budget + '\n' +
              'Описание: ' + project.description + '\n' +
              'Ссылка на проект: ' + project.link_to_presentation);
  } else {
    ctx.reply('Результаты поиска: \n По вашему запросу ничего не найдено')
  }
  
});

export default searchScene;
