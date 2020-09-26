const router = require("express").Router()
const { User, Product, Cart } = require("../db/models")
module.exports = router

//GET /api/cart/userId
// REFACTOR THIS TO MAKE IT SEND LESS STUFF. attributes SHOULD GO IN THE PRODUCT EAGER LOAD
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
    console.log("PUT route increment item")
    // first we find or create the association.
    const cartArray = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    // grab what was returned
    let cart = cartArray[0]
    // grab whether or not we had to create the association
    let wasCreated = cartArray[1]
    // if we already had the association, that means the item was already in that user's cart. In this case, we don't want a new row, we just want the existing row's quantity to increment by 1.
    if (!wasCreated) {
      cart = await cart.increment("quantity", { by: 1 })
      res.send(cart.productId) // we can just map over the existing cart using array.map on the store.
    } else {
      // since we didn't have the association already, that means the user's cart didn't include any instance of that item. we need to send the whole item back to add to the cart.
      const newCartItem = await User.findOne({
        where: {
          id: cart.userId
        },
        include: [
          {
            model: Product,
            where: {
              id: cart.productId
            }
          }
        ]
      })
      console.log("User adds 1st item to cart: ", newCartItem)
      res.send(newCartItem)
    }
  } catch (error) {
    next(error)
  }
})

//delete

//deincrement route (also what happens if decrement below 0. Sequlize table? Conditional Rendering in cart for quantity less htan 0)

//checkout route 1) clear by userId 2) update Order and OrderDetails
