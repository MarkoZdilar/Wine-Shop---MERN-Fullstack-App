import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //Prenosimo izvođenje na iduću funkciju (server.js)
  } catch (err) {
    res.sendStatus(403);
  }
};

export default authenticateToken;
