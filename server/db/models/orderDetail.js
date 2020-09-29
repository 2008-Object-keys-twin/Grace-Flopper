const Sequelize = require("sequelize")
const db = require("../db")

const OrderDetail = db.define("orderDetail", {
  productId: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER // THESE ARE IN CENTS
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderDetail
