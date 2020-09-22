import React from 'react'
import {cart} from '../store'
import {connect} from 'react-redux'

const Cart = props => {
  console.log(props)
  return <div>Here's the cart!</div>
}

const mapStateToProps = state => ({
  email: state.user.email,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(cart(id))
  }
}

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default connectedCart
