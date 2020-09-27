const Sequelize = require("sequelize")
const db = require("../db")

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "http://photos.gograph.com/thumbs/CSP/CSP616/k6166043.jpg",
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.FLOAT
  },
  size: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["S", "M", "L"]]
    }
  },
  color: {
    type: Sequelize.STRING
  },
  filter: {
    type: Sequelize.ARRAY({
      type: Sequelize.STRING,
      validate: {
        isIn: [["men", "women", "children", "deal"]]
      }
    })
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
