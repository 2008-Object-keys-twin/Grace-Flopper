const User = require("./user")
const Product = require("./product")
const Cart = require("./cart")
const Order = require("./order")
const OrderDetail = require("./orderDetail")
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Product, { through: Cart })
Product.belongsToMany(User, { through: Cart })
// Cart.belongsTo(User)
// Cart.hasMany(Product, { as: "productId" })

// if the user product pair doesn't exist, create it with a quantity of 1
// if it does exist, add to quantity
// uniqueId for this table, userId, productId, and the quantity
// we know we have taken the cart and created an order from it.
// now, any cart items associated with that userId can be Cart.destroy(by UserId)

User.hasMany(Order, { as: "orderId" })
Order.belongsTo(User)

Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order)

User.hasMany(OrderDetail)
OrderDetail.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Cart,
  Order,
  OrderDetail
}
