module.exports = (req, res, next) => {
  if (!!req.user && req.user.dataValues.isAdmin) {
    next()
  } else {
    const err = new Error("Unauthorized")
    err.status = 401
    next(err)
  }
}
