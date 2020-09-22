const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  size: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['S', 'M', 'L']]
    }
  },
  color: {
    type: Sequelize.STRING
  },
  filter: {
    type: Sequelize.ARRAY({
      type: Sequelize.STRING,
      validate: {
        isIn: [['men', 'women', 'children', 'deal']]
      }
    })
  },
  Inventory: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
