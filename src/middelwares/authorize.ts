import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

const Authorize = (array: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        let isPermitted = false

        const role = req.body.userRole

        array.map(e => {
            if (e === role) {
                isPermitted = true
                return
            }
        })

        if (isPermitted) next()
        else res.json({
            message: "Forbidden"
        })
    }
}

export {
    Authorize
}