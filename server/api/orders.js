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
    const orderDetail = await OrderDetail.create({
      userId: req.body.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      price: req.body.price,
      orderId: req.body.orderId
    })
    res.send(orderDetail)
  } catch (error) {
    console.error("Error in Order Detals")
  }
})
