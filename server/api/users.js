const router = require("express").Router()
const { User } = require("../db/models")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get("/admin", async (req, res, next) => {
  try {
    console.log("this is the req.body------> ", req.params)
    if (req.body.isAdmin) {
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
