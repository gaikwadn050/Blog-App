import express from "express"
import uploadMiddleware from "../middleware/uploadMiddlware.js"
import { userPost, updatePost, getPosts, getPostbyId } from "../controllers/postController.js"
import { verifyToken } from "../utils/jwtUtils.js"
const postRouter = express.Router()

postRouter.post('/post', uploadMiddleware.single('file'), userPost)
postRouter.put('/post', uploadMiddleware.single('file'), updatePost)
postRouter.get('/post', getPosts)
postRouter.get('/post/:id', getPostbyId)

export default postRouter;