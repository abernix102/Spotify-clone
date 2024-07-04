import * as axiosConfig from "../../config/axios.config";

export const getRefreshToken = async (refreshToken: string) => {
    try {
        const response = await axiosConfig.token.post('/token', {
            grant_type: 'refresh_token',
            refreshToken: refreshToken
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el token de refresco');
    }
}

