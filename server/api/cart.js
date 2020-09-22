const router = require('express').Router()
const {User, Product} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Product
        }
      ],
      attributes: ['id']
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
