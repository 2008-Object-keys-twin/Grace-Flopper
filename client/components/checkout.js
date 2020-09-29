import React from "react"
import { connect } from "react-redux"
import { placeOrder } from "../store/cart"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

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
        <p>Please allow 7-10 business days for delivery.</p>
        <span>Feel free to </span>
        <Link to="/">do some more shopping.</Link>
      </div>
    ) : (
      <div>
        <div>
          <h3>
            Total: ${this.props.cart.reduce((accumulator, item) => {
              return (accumulator += item.price * item.cart.quantity)
            }, 0)}
          </h3>
        </div>
        <Button type="button" onClick={() => this.handleSubmit()}>
          Place Order
        </Button>
        {this.props.cart.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.cart.quantity}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.user.id,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  submitOrder: (userId, cart) => dispatch(placeOrder(userId, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
