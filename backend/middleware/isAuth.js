const jwt = require('jsonwebtoken');
const config = require("../config");

function isAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).send({ msg: "invalid token" });
      req.user = decode;
      next();
      return
    })
  }
  else return res.status(401).send({ msg: "token is not provided" });
}

module.exports = isAuth; 