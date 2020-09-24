const router = require("express").Router()
const { Product } = require("../db/models")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "price",
        "size",
        "color",
        "filter",
        "imageUrl",
        "quantity"
      ]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
