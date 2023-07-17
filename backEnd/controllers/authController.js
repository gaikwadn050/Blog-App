import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
const {username, password} = User;

dotenv.config()

const salt = bcrypt.genSaltSync(10);
const secret = process.env.KEY;


 const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validator
    if (!username || !password) {
      return res.status(400).json({ err: "All fields must be filled" })
    }
    //check if user already exists
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(401).json({ err: "username already Exists" })
    }

    //creating new user
    const userDoc = new User({ username, password: bcrypt.hashSync(password, salt) })
    await userDoc.save()
  } catch (err) {
    res.status(500).json({ err: "Internal server error" })
  }
}


//Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  console.log(userDoc)
  if (!userDoc) {
    return res.status(400).json('User not found');
  }
  console.log(userDoc,"43")

  const passOk = bcrypt.compareSync(password, userDoc.password);
  console.log(passOk)
  if (passOk) {
    const token = jwt.sign({ username, id: userDoc._id }, secret);
  res.cookie('token', token).json({
    id: userDoc._id,
    username,
  });
}

  }
    //logged in
    
    //  jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
    //   if (err) throw err;
    //   res.cookie('token', token).json({
    //     id: userDoc._id,
    //     username,
    //   })
    // })
   




export const logoutUser = (req, res) => {
  res.cookie('token', '').json('ok');
}


export default registerUser;