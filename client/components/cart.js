import React from "react"
import { loadCart, removeItem } from "../store"
import { connect } from "react-redux"

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  handleClick(itemId) {
    const userId = this.props.userId
    console.log("this.props: ", this.props)
    this.props.removeFromCart(userId, itemId)
  }

  render() {
    // console.log('this.props.cart-----> ', this.props.cart)

    return (
      <div>
        <h1>Here's the cart!</h1>
        <ul>
          {this.props.cart.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} />
              <h5>Item:{item.name}</h5>
              <p>Price:{item.price}</p>
              <button type="button" onClick={() => this.handleClick(item.id)}>
                Delete Item
              </button>
            </li>
          ))}
        </ul>
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
      dispatch(removeItem(userId, productId))
  }
}

const connectedCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default connectedCart
