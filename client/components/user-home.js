import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {cart} from '../store'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <p>CART</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(cart(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
