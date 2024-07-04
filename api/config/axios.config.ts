import axios from "axios"
import * as apiConfig from "./api.config";
import { Buffer } from "buffer";

export const token = axios.create({
    baseURL: apiConfig.TOKEN_BASE_URL,
    headers:{
        'Authorization': `Basic ${(Buffer.from(apiConfig.CLIENT_ID + ':' + apiConfig.CLIENT_SECRET).toString('base64'))}`,
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
})

const api = axios.create({baseURL: apiConfig.BASE_URL})


export const getData = async (apiUrl:string, accses_token:string) : Promise <any> => {
    try{
        const  response = await api.get(apiUrl,{
            headers: {
                'Authorization': `Bearer ${accses_token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}