const router = require("express").Router()
const { User } = require("../db/models")
const adminMiddleware = require("./adminMiddleware")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email", "isAdmin"]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get("/admin", adminMiddleware, async (req, res, next) => {
  try {
    if (req.query.isAdmin) {
      const users = await User.findAll()
      res.json(users)
    } else {
      res.status(401).send("Unauthorized")
    }
  } catch (err) {
    next(err)
  }
})

router.get("/:userId", async (req, res, next) => {
  try {
    const admin = await User.findByPk(req.params.userId, {
      attributes: ["isAdmin"]
    })
    if (admin.dataValues.isAdmin) {
      res.status(202).send(true)
    } else {
      res.status(401).send(false)
    }
  } catch (err) {
    next(err)
  }
})
