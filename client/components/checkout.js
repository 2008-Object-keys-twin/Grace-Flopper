import React from "react"
import { connect } from "react-redux"

const Checkout = (props) => {
  return (
    <div>
      {props.cart.map((item) => (
        <li key={item.id}>
          <img src={item.imageUrl} />
          <h5>Item: {item.name}</h5>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.cart.quantity}</p>
        </li>
      ))}
      <div>
        Total: ${props.cart.reduce((accumulator, item) => {
          return (accumulator += item.price * item.cart.quantity)
        }, 0)}
      </div>
      <button type="button">Place Order</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
