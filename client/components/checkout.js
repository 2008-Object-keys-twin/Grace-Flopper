import React from "react"
import { connect } from "react-redux"
import { placeOrder } from "./../store/cart"

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      orderPlaced: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const userId = +this.props.userId
    const cart = this.props.cart
    this.props.submitOrder(userId, cart)
    this.setState({ orderPlaced: true })
  }

  render() {
    return this.state.orderPlaced ? (
      <div>
        <h1>Your order has been successfully placed!</h1>
      </div>
    ) : (
      <div>
        {this.props.cart.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} />
            <h5>Item: {item.name}</h5>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.cart.quantity}</p>
          </li>
        ))}
        <div>
          Total: ${this.props.cart.reduce((accumulator, item) => {
            return (accumulator += item.price * item.cart.quantity)
          }, 0)}
        </div>
        <button type="button" onClick={() => this.handleSubmit()}>
          Place Order
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  submitOrder: (userId, cart) => dispatch(placeOrder(userId, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
