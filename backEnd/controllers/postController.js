import fs from "fs"
import jwt from "jsonwebtoken"
import Post from "../models/Post.js"
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.KEY;

export const userPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1];
  const newPath = path + '-' + ext;
  fs.renameSync(path, newPath)
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json({ postDoc });
  });
};

export const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
  
    const postDoc = await Post.findById(id);
    console.log(postDoc,"postdoc")
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
}

export const getPosts = async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  )
};

export const getPostbyId = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
  console.log(postDoc, "update >>>>>>>>>>>>>>>>>>")

}