
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  else res.status(404).send({ msg: "unauthorized access" });
}

module.exports = isAdmin;