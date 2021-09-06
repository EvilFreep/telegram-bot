import { Telegraf,  Scenes, Context, }  from 'telegraf';
import { session } from 'telegraf';
import { Stage } from 'telegraf/typings/scenes';

//Define your own context type

interface MyContext extends Context {
    myContextProp: string
    // declare scene type
    scene: Scenes.SceneContextScene<MyContext>
}

export default MyContext;