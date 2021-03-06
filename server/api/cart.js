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
          model: Product,
          attributes: {
            exclude: ["filter", "quantity", "createdAt", "updatedAt"]
          },
          through: {
            attributes: ["quantity"]
          }
        }
      ],
      attributes: ["id"]
    })
    res.json(cart[0].products)
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
      cart = await cart.increment("quantity", { by: 1 })
      res.send(String(cart.productId))
    } else {
      const newCartItem = await User.findOne({
        where: {
          id: cart.userId
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["filter", "quantity", "createdAt", "updatedAt"]
            },
            through: {
              attributes: ["quantity"]
            },
            where: {
              id: cart.productId
            }
          }
        ],
        attributes: ["id"]
      })
      res.send(newCartItem.products[0])
    }
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart/update
router.put("/update", async (req, res, next) => {
  try {
    await Cart.update(
      { quantity: req.body.quantity },
      {
        where: {
          userId: req.body.userId,
          productId: req.body.productId
        }
      }
    )
    res.send("Cart updated")
  } catch (error) {
    console.error("Error when updating quantity")
    next(error)
  }
})

//DELETE /api/cart
router.delete("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.query.userId)
    user.removeProduct(req.query.productId)
    res.send("item removed")
  } catch (error) {
    next(error)
  }
})

// DELETE /api/cart/flush/:userId
router.delete("/flush/:userId", async (req, res, next) => {
  try {
    await Cart.destroy({ where: { userId: req.params.userId } })
    res.send("User cart successfully flushed")
  } catch (error) {
    next(error)
  }
})
