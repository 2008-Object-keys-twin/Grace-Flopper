import React from "react"
import { loadCart, removeItem, updateItemQuantity } from "../store"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getCart(this.props.userId)
    }
  }

  handleClick(itemId) {
    const userId = this.props.userId
    this.props.removeFromCart(userId, itemId)
  }

  handleChange(productId, event) {
    const quantity = +event.target.value
    const userId = this.props.userId

    this.props.editQuantity(userId, productId, quantity)
  }

  render() {
    return (
      <div>
        <h1>Here's the cart!</h1>
        <ul>
          {this.props.cart.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} />
              <h5>Item: {item.name}</h5>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.cart.quantity}</p>
              <label htmlFor="quantity">Update Quantity</label>
              <select
                name="quantity"
                value={item.cart.quantity}
                onChange={(event) => this.handleChange(item.id, event)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <button type="button" onClick={() => this.handleClick(item.id)}>
                Delete Item
              </button>
            </li>
          ))}
        </ul>
        <Link to="/checkout">Proceed to Checkout</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => dispatch(loadCart(id)),
    removeFromCart: (userId, productId) =>
      dispatch(removeItem(userId, productId)),
    editQuantity: (userId, productId, quantity) =>
      dispatch(updateItemQuantity(userId, productId, quantity))
  }
}

const connectedCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default connectedCart
