import { Request, Response } from 'express'
import UserModel from '../models/users.models'
import jwt from 'jsonwebtoken'

const users = async (req: Request, res: Response) => {
    const data = await UserModel.find({})
    res.json(data)
}

const addNumber = (req: Request, res: Response): void => {
    const obj = {
        x: 10,
        y: 5
    }

    interface user {
        x: number,
        y: number
    }

    const sum = (obj: user): number => {
        return obj.x + obj.y
    }

    res.json({
        adition: sum(obj)
    })
}

const addUser = async (req: Request, res: Response) => {

    const _user = await UserModel.findOne({ name: req.body.name })
    const _email = await UserModel.findOne({ email: req.body.email })

    if (_user || _email) {
        res.json({ "message": 'Username and email is already present' })
        return
    }

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    await user.save()

    res.json({ "message": "user created successfully" })
}

const deleteUser = async (req: Request, res: Response) => {

    console.log(req.params.id)

    const user = await UserModel.findByIdAndDelete(req.params.id)

    if (!user) {
        res.json({ message: "user not found" })
    }
    else {
        res.json({ message: "usee deleted succesullfy" })
    }

}

const loginUser = async (req: Request, res: Response) => {
    const _email = await UserModel.findOne({ email: req.body.email })
    const _password = await UserModel.findOne({ password: req.body.password })

    if (!_email || !_password) {
        res.json({
            message: 'Invalid credentials'
        })
    } else {

        const user = {
            _email
        }

        var token = jwt.sign(user, 'secretkey', { expiresIn: 60 * 60 })
        res.json({
            messasge: 'Login successfully',
            user,
            token: token
        })
    }
}

const editUser = async (req: Request, res: Response) => {

    const user = await UserModel.findById(req.params.id)

    if (!user) {
        res.json({ message: "user not found" })
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        await user.save();
        res.status(200).json({ user });
    }
}


export { users, addNumber, addUser, deleteUser, editUser, loginUser }