import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const Auth = (req: Request, res: Response, next: NextFunction) => {

    try {
        const headers: any = req.headers.authorization

        if (!headers) {
            res.json({
                message: "Authorization token not found"
            })
        }
        const token: string = headers.split(' ')[1]

        const decoded: any = jwt.verify(token, 'secretkey');
        req.body.userRole = decoded._email.role
        next()

    } catch (error) {
        res.json({
            message: error
        })
    }

}

export {
    Auth
}  