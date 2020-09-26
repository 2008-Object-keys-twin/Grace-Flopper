import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { AllItems } from "./"

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props
  const admin = props.isAdmin

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <NavLink to="/cart">Go to cart</NavLink>
      {admin ? <NavLink to="/admin">Go to Admin</NavLink> : false}
      <AllItems />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(cart(id))
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
