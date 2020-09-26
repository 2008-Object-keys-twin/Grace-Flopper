import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch, Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Login, Signup, UserHome, Cart, AdminPage } from "./components"
import { me, isAdmin } from "./store"
import AllItems from "./components/allItems"
import SingleItemView from "./components/singleItemView"

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
    console.log("This is the props on Route component", adminLoggedIn)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={AllItems} />
        <Route exact path="/item/:productId" component={SingleItemView} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
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
    isLoggedIn: !!state.user.id,
    adminLoggedIn: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    adminUser: (id) => dispatch(isAdmin(id))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
