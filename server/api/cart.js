const router = require("express").Router()
const { User, Product , Cart} = require("../db/models")
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
    console.log("req.body--------> ", req.body)
    const cartArray = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId,
        // quantity: 1
      }
    })
    let cart = cartArray[0]
    let wasCreated = cartArray[1]

    // console.log('CART---------------> ', cart.dataValues.quantity)
    if (!wasCreated) {
      //newly created
      console.log('hellooooooooooo')
      cart = await cart.increment('quantity', { by: 1})
      console.log('CART------------->', cart)

    }
      console.log('before response: wasCreated---------> ', wasCreated)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
