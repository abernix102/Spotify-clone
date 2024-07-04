import * as apiConfig from "../../config/api.config";
import * as axiosConfig from "../../config/axios.config"
import { AxiosResponse } from "axios";

// Tipos de grant
const GRANT_TYPES = {
    AUTHORIZATION_CODE: 'authorization_code',
};


export const getToken = async (code: string) => {
    try {
        const response: AxiosResponse = await axiosConfig.token.post("/token", {
            grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
            code,
            redirect_uri: apiConfig.REDIRECT_URI,
        });

        return response; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener el token:', error);
        throw new Error('No se pudo obtener el token'); // Lanza una excepción o maneja el error de otra manera
    }
};
