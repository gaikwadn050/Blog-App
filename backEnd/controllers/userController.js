import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.KEY;


export const getProfile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};
