const router = require("express").Router()
const { Product } = require("../db/models")
const adminMiddleware = require("./adminMiddleware")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.post("/", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.body
    const newProduct = await Product.create(product)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put("/:productId/update", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.query.product
    const id = req.query.id
    const updateProduct = await Product.update(product, {
      where: {
        id: id
      }
    })
    res.json(updateProduct)
  } catch (error) {
    next(error)
  }
})

router.delete("/", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.body.product
    const deleteProduct = await Product.destroy({
      where: {
        id: product.id
      }
    })
    res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
})
