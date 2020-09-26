import React from "react"
import { connect } from "react-redux"
import { fetchAllUsers } from "../store"

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers(this.props.administratorCheck)
  }

  render() {
    console.log("what is in admin page props ---->", this.props)
    console.log("what is in admin page AllUsers ---->", this.props.f)
    return (
      <div>
        <h1>Here's the adminPage!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.allUsers
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (bool) => {
      dispatch(fetchAllUsers(bool))
    }
  }
}

const connectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(
  AdminPage
)

export default connectedAdminPage
