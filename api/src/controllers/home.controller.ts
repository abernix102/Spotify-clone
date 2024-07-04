import { Request, Response } from "express"
import { getData } from "../../config/axios.config"

export const homeMe = async (req : Request, res : Response) => {
    try{
        const {data:curretProfile} = await getData('/me', req.cookies.access_token)
        res.status(200).json(curretProfile)
    }catch(error){
        res.status(400).json({response: 'error al obtener los datos'})
    }
}
