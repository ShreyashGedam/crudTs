import express from 'express'
import { addNumber, addUser, deleteUser, users, editUser, loginUser } from '../controllers/users'
import { Auth } from '../middelwares/awth'
import { Authorize } from '../middelwares/authorize'

const router = express.Router()

router.get("/users", Auth, Authorize(["employee", "admin"]), users)
router.post("/addNumber", addNumber)
router.post("/addUser", Auth, Authorize(["admin"]), addUser)
router.post("/loginUser", loginUser)
router.delete("/deleteUser/:id", Auth, Authorize(["admin"]), deleteUser)
router.patch("/editUser/:id", Auth, Authorize(["admin"]), editUser)

export { router }   