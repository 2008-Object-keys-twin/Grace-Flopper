const router = require("express").Router()
const { User, Product } = require("../db/models")
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
    //PUT /api

    //PUT /api/cart
    router.put("/", async (req, res, next) => {
      try {
        console.log("req.body--------> ", req.body)
        const cartArray = await Cart.findorCreate({
          where: {
            userId: req.body.userId,
            productId: req.body.productId
          }
        })
        const cart = cartArray[0]
        const wasCreated = cartArray[1]

        if (wasCreated) {
          //newly created
          await cart.update({ quantity: 1 })
        } else {
          await cart.update({ quantity: quantitiy++ })
        }
      } catch (error) {
        next(error)
      }
    })
    next(err)
  }
})
