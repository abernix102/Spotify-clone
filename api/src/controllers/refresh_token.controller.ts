import { getRefreshToken } from "../services/refresh_token.api";
import { Request, Response } from "express";

export const refreshToken = async (req: Request, res: Response) => {
    const MILLISECONDS = 1000;

    try {
        const response = await getRefreshToken(req.cookies.refresh_token);

        if (response.status === 200) {
            const { access_token, expires_in } = response.data;
            res.cookie('access_token', access_token, { maxAge: expires_in * MILLISECONDS, httpOnly: false, secure: process.env.NODE_ENV === 'production' });
            const redirectUrl = req.query.redirect ? String(req.query.redirect) : '';
            res.redirect(redirectUrl);
        }  else if (response.status === 401) {
            res.status(401).redirect('http://localhost:5173/') // 401 Unauthorized
        } else {
            res.status(500).redirect('http://localhost:5173/') // 500 Internal Server Error or other appropriate status
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).redirect('http://localhost:5173/')
    }
};
  
