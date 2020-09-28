import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { AllItems } from "./"

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <AllItems />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.user.email,
    userId: state.user.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
