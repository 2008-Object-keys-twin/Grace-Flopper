import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { me } from "./store"
import Checkout from "./components/checkout"
import {
  Login,
  Signup,
  UserHome,
  Cart,
  AdminPage,
  AllItems,
  SingleItemView
} from "./components"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props
    const { adminLoggedIn } = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={AllItems} />
        <Route exact path="/item/:productId" component={SingleItemView} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            {/* This route will only be available if you are logged in *an* and admin */}
            {adminLoggedIn && (
              <Switch>
                <Route
                  exact
                  path="/admin"
                  component={() => (
                    <AdminPage administratorCheck={adminLoggedIn} />
                  )}
                />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
        {/*<Route path="/products" component={allItems} />*/}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id,
    adminLoggedIn: state.user.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
