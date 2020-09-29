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
    const product = req.body.product
    const id = +req.params.productId
    const [row, data] = await Product.update(
      {
        name: product.name,
        description: product.description,
        color: product.color,
        price: product.price,
        quantity: product.quantity,
        filter: [product.filter],
        imageUrl: product.imageUrl,
        size: product.size
      },
      {
        where: {
          id: id
        },
        returning: true,
        plain: true
      }
    )
    res.status(200).send(data)
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
