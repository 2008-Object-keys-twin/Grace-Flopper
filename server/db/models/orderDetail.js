const Sequelize = require("sequelize")
const db = require("../db")

const OrderDetail = db.define("orderDetail", {
  itemId: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  },
  orderQuantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderDetail
