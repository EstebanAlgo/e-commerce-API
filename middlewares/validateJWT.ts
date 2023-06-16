import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const ValidateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: 'Authorization Required Token.' })

    try {
        const payload = <any>jwt.verify(token, "secret_key");
        req.uid = payload.uid;
        req.role = payload.role;
        req.name = payload.name;
        req.lastName = payload.lastName;
        req.email = payload.email;
        req.iat = payload.iat;
        req.exp = payload.exp;
        next();
    } catch (error) {
        //console.log(error);
        return res.status(401).json({ msg: 'Invalid Token' })
    }

};
export default ValidateJWT;
