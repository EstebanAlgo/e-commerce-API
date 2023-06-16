import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
/** Validamos que el usuario envía información correcta*/
const ValidateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(202).json(errors);
    next();
};

export default ValidateRequest;