import { Schema, model } from "mongoose"

export interface User {
    name: string,
    email: string,
    password: string,
    role: string
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

const UserModel = model<User>('user', userSchema)

export default UserModel