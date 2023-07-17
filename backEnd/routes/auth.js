import express from "express"
import registerUser, { loginUser, logoutUser } from "../controllers/authController.js"
import { getProfile } from "../controllers/userController.js"
import { verifyToken } from "../utils/jwtUtils.js"
const authRouter = express.Router()


authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)
authRouter.post('/logout', logoutUser)
authRouter.get('/profile', getProfile)

export default authRouter;