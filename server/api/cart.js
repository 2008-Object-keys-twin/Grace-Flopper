const router = require("express").Router()
const { User, Product } = require("../db/models")
module.exports = router

router.put("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    if (!cart) {
      await Cart.create({
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: 1
      })
    } else {
      cart.quantity++
    }
  } catch (error) {
    next(error)
  }
})

router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Product
        }
      ],
      attributes: ["id"]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
