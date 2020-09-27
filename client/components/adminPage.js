import React from "react"
import { connect } from "react-redux"
import { fetchAllUsers } from "../store"

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.fetchUsers(this.props.administratorCheck)
  }

  render() {
    const { data } = this.props.allUsers || []
    console.log(data)
    return (
      <div>
        <h1>Here's the adminPage!</h1>
        {!!data &&
          data.map((user) => {
            return <div key={user.id}> {user.email} </div>
          })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.user.allUsers
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (bool) => {
      dispatch(fetchAllUsers(bool))
    }
  }
}

const connectedAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)

export default connectedAdminPage
