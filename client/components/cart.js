import React from 'react'
import {cart} from '../store'
import {loadCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  async componentDidMount() {
    // console.log(`HERE'S THIS (LITERALLY)`, this)
    // console.log(`HERE'S THIS.PROPS (LITERALLY) PLEASE PRAY FOR ME`, this.props)
    console.log('THIS.PROPS', this.props)
    // const meResult = await this.props.me()
    // console.log('RESULT FROM RUNNING ME ->', meResult)
    const data = await this.props.getCart(this.props.userId)
    //what if user doesn't exist?
    console.log('THIS IS THE DATA --->', data)
    console.log(`HERE'S THE CURRENT STATE OF THINGS`, this.state)
    // this.setState({
    //   cart: userCart
    // })
  }

  render() {
    return (
      <div>
        <h1>Here's the cart!</h1>
        <ul>
          {/* {this.state.cart.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))} */}
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
    getCart: id => dispatch(loadCart(id))
    // me: () => dispatch(me())
  }
}

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default connectedCart
