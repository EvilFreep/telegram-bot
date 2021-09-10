import axios, { AxiosPromise, AxiosResponse } from 'axios';
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
async function postRequest(json: string) {
  const res = await axios.post('http://localhost:3001/brief', json, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  }).catch(e => { console.log(e) });
  console.log(res)

  return res
}

export function sendQuizDataOnServer(): boolean {
  if (quizInfo.length != 32) {
    console.log(quizInfo.length)
    return false
  }

  var dataBrief
  {
    email: quizInfo[0];
    companyName: quizInfo[1];
    companyInfo: quizInfo[2];
    isFirstProject: quizInfo[3];
    personName: quizInfo[4];
    isWorkedWithOtherAgencies: quizInfo[5];
    whatPreferredAndNot: quizInfo[6];
    isOneTimeOrContinuous: quizInfo[7];
    criteriesOfWorkersChoosing: quizInfo[8];
    contactPerson: quizInfo[9];
    whoWillTakeDecisions: quizInfo[10];
    mainFunctionality: quizInfo[11];
    whatProblemsProductSolves: quizInfo[12];
    productAuditory: quizInfo[13];
    platform: quizInfo[14];
    isDocumentationAvailable: quizInfo[15];
    links: quizInfo[16];
    whatOsSupporting: quizInfo[17];
    linksToExistingExamples: quizInfo[18];
    linkExampleProsAndCons: quizInfo[19];
    ourProductAdvantages: quizInfo[20];
    isDesignFromScratch: quizInfo[21];
    isAppWillRunBackgroundSounds: quizInfo[21];
    isAppWillMultilingual: quizInfo[23];
    isMonetization: quizInfo[24];
    isServerPartAdminPanel: quizInfo[25];
    ifIsServerPartAdminIsBackend: quizInfo[26];
    screenOrientation: quizInfo[27];
    helpWithPublication: quizInfo[28];
    developmentStart: quizInfo[29];
    relizeDate: quizInfo[30];
    budget: quizInfo[31];
    other: quizInfo[32];
  }
console.log(dataBrief)

const json = JSON.stringify(dataBrief);
const res = postRequest(json)
  
  return true
}