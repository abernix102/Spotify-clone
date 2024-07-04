import { NextFunction, Request, Response } from "express";
export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    const { access_token, refresh_token } = req.cookies;
    if (access_token && !refresh_token) {
        return res.status(401).redirect(`http://localhost:5173/`); // Redirecciona a login si falta el refresh_token
    }
    
    // Caso: No hay ni access_token ni refresh_token (usuario no autenticado)
    if (!access_token && !refresh_token) {
        return res.status(401).redirect("http://localhost:5173/"); // Redirecciona a login si no hay tokens
    }
    
    // Caso: No hay access_token pero hay refresh_token (necesita renovar el token)
    if (!access_token && refresh_token) {
        return res.status(307).redirect(`/auth/refresh_token?redirect=${req.originalUrl}`)
        // Redirecciona a la ruta para refrescar el token
    }

    // Caso: Ambos tokens están presentes (usuario autenticado)
    next(); // Continúa con la ejecución normal de la ruta protegida
    return
};
