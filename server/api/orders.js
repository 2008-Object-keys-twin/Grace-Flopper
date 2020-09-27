const router = require("express").Router()
const { User, Product, Cart, Order, OrderDetail } = require("../db/models")
module.exports = router

//POST /api/orders
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create({ userId: req.body.userId })
    res.send(order)
  } catch (error) {
    console.error("Error in placing order")
  }
})

//POST /api/orders/details
router.post("/details", async (req, res, next) => {
  try {
    const orders = await Promise.all(
      req.body.cart.map((order) => {
        return OrderDetail.create({
          userId: req.body.userId,
          productId: order.id,
          quantity: order.cart.quantity,
          price: order.price,
          orderId: req.body.orderId
        })
      })
    )
    res.send(orders)
  } catch (error) {
    console.error("Error in Order Detals")
  }
})
