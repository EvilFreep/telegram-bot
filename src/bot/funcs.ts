import { Telegraf, session, Scenes, Markup, Context }  from 'telegraf';
import { reduceEachTrailingCommentRange } from 'typescript';
import MyContext from './extededContext';
let quizInfo:Array<string> = new Array<string>();

 export function parsePoll(ctx: MyContext): string {
  let result: string = ''
  ctx.poll?.options.forEach(e => {
    if(e.voter_count != 0)
    {
      result += e.text + ' '
    }
  });

  return result
}

export function saveQuizData(s:string) {
  quizInfo.push(s)
}

export function showQuizData(): Array<string> {
  return quizInfo;
}

export function initQuizData() {
  quizInfo = []
}