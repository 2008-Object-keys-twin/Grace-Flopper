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

router.post("/", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.body
    const newProduct = await Product.create(product)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put("/", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.query
    console.log("this is the thunk product req", product)
    const updateProduct = await Product.update(product, {
      where: {
        id: product.id
      }
    })
    res.json(updateProduct)
  } catch (error) {
    next(error)
  }
})

router.delete("/", adminMiddleware, async (req, res, next) => {
  try {
    const product = req.body
    console.log("DO I GET HERE?")
    const deleteProduct = await Product.destroy({
      where: {
        name: product.name
      }
    })
    res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
})
