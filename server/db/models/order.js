const Sequelize = require("sequelize")
const db = require("../db")

const Order = db.define("order", {
  userId: {
    type: Sequelize.INTEGER
  },
  itemIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  prices: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  orderQuantities: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

Order.prototype.calculateTotal = function() {
  return this.prices.reduce(function(accumulator, currentValue, index) {
    return (accumulator +=
      currentValue * this.orderQuantities[index])
  }, 0)
}

module.exports = Order
