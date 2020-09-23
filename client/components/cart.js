import React from 'react'
import {loadCart} from '../store'
import {connect} from 'react-redux'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Here's the cart!</h1>
        <ul>
          {this.props.cart.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(loadCart(id))
  }
}

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default connectedCart
