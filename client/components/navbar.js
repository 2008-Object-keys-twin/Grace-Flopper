import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"

const Navbar = ({ handleClick, isLoggedIn, adminLoggedIn }) => {
  return (
    <div>
      <h1>Grace Flopper: Your one stop shop for all your flip-flop needs!</h1>
      <nav>
        <Link to="/">Products Home</Link>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {/* Only show the following link if a user is an admin */}
            {adminLoggedIn && <Link to="/admin">Administrator Settings</Link>}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">Go to cart</Link>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.user.id,
    adminLoggedIn: !!state.user.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
