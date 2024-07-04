import * as querystring from 'querystring';
import * as apiConfig from '../../config/api.config';
import * as utils from '../helpers/helpers.util';
import { getToken } from '../services/auth.api';
import { Request, Response } from 'express';

export const auth = (__req: Request, res: Response): void => {
  const state = utils.generateRandomString(16);
  res.cookie(apiConfig.STATE_KEY, state, { httpOnly: true });
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: apiConfig.CLIENT_ID,
        scope: apiConfig.SCOPE,
        redirect_uri: apiConfig.REDIRECT_URI,
        state,
      })
  );
};

export const callback =  async (req: Request, res: Response) => {
  const MILLSECONDS = 1000; 
  const ONE_WEEK = 604800000;
  const {code = null, state = null, error = null} = req.query; 
  const storedState = req.cookies[apiConfig.STATE_KEY]
  if(error || !state || state !== storedState){
    res.status(400).redirect(`${apiConfig.CLIENT_URL}/login?error=state_mismatch`)
  }else{
    res.clearCookie(apiConfig.STATE_KEY);
  }
  try{
    const tokenResponse = await getToken(code as string);
    if(tokenResponse.status === 200){
      const {access_token, refresh_token, expires_in} = tokenResponse.data;
      res.cookie('access_token', access_token, {maxAge: expires_in * MILLSECONDS, httpOnly:false, secure:process.env.NODE_ENV === 'production'})
      res.cookie('refresh_token', refresh_token, {maxAge: ONE_WEEK, httpOnly:true});
      res.status(303).redirect(`${apiConfig.CLIENT_URL}/home`);
    }else{
      res.status(400).redirect(`${apiConfig.CLIENT_URL}`);
    }
  }catch(error){
    console.log('error al obtener tokens', error)
    res.status(500).json({error: 'error interno del servidor CALLBACK FAIL :Da'})
  }
}