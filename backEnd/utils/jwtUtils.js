import jwt from 'jsonwebtoken';

const secret = 'qadfgthrgnrjjjrtr12';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    req.userInfo = info;
    next();
  });
};
