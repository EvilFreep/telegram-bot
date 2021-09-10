import axios, { AxiosResponse } from 'axios';

export async function getRequest(url: string):Promise<any> {
    axios.get(url).then( 
    data => {
    return  data.data
    })
}