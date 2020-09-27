module.exports = (req, res, next) => {
  const currUser = req.user.dataValues
  if (currUser && currUser.isAdmin) {
    next()
  } else {
    const err = new Error("Unauthorized")
    err.status = 401
    next(err)
  }
}
