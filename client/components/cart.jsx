import React from 'react'
import {cart} from '../store'
import {connect} from 'react-redux'

class Cart extends React.Component {
  //constructor() {
  //  super()
  //  // this.state = {
  //  //   cart: []
  //  // }
  //}

  //componentDidMount() {
  //  const data = this.getCart(this.props.userId)
  //  //what if user doesn't exist?
  //  const userCart = data.products
  //  this.setState({
  //    cart: userCart
  //  })
  //}
  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Here's the cart!</h1>
        <p />
      </div>
    )
  }
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
