const router = require("express").Router()
const { User, Product, Cart } = require("../db/models")
module.exports = router

//GET /api/cart/userId
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

//PUT /api/cart
router.put("/", async (req, res, next) => {
  try {
    const cartArray = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    let cart = cartArray[0]
    let wasCreated = cartArray[1]
    if (!wasCreated) {
      //newly created
      cart = await cart.increment("quantity", { by: 1 })
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
