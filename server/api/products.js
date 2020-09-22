const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'price', 'size', 'color', 'filter']
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
