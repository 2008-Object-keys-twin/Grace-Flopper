import React from 'react'
import { cart } from '../store'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  componentDidMount() {
    console.log(`HERE'S THIS (LITERALLY)`,this)
    const data = this.props.getCart(this.props.userId)
    //what if user doesn't exist?
    const userCart = data.products
    console.log(`HERE'S THE CURRENT STATE OF THINGS`, state)
    this.setState({
      cart: userCart
    })
  }

  render() {
    return (
      <div>
        <h1>Here's the cart!</h1>
        <ul>
          {this.state.cart.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
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
