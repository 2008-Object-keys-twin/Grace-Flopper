import React from "react"
import { connect } from "react-redux"
import { fetchAllUsers, addNewProduct } from "../store"

class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      color: "",
      price: 0,
      filter: {},
      quantity: 0,
      imageUrl: "",
      size: ""
    }
  }

  componentDidMount() {
    this.props.fetchUsers(this.props.administratorCheck)
  }

  onChange(event) {
    const name = event.target.name
    const value = event.target.value
    const newProduct = {
      [name]: value
    }
    this.setState(newProduct)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProduct(this.state)
  }

  render() {
    const { data } = this.props.allUsers || []
    return (
      <div id="admin-page-body">
        <h1>Here's the adminPage!</h1>
        <div className="admin-user-list">
          <h2>Manage Users:</h2>
          {!!data &&
            data.map((user) => {
              return (
                <span key={user.id} className="admin-user-item">
                  <p>User: {user.email}</p>
                  <p>ID number: {user.id}</p>
                  <p>Administrator status: {`${user.isAdmin}`}</p>
                </span>
              )
            })}
        </div>
        <hr />
        <h2>Add new products to the database</h2>
        <form
          id="add-product-form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <label onChange={() => this.onChange(event)}>
            <span>Product name:</span>
            <input name="name" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Color:</span>
            <input name="color" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Price:</span>
            <input name="price" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Image URL:</span>
            <input name="imageUrl" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Size (S, M, L):</span>
            <input name="size" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Filters (Men, Women, or Children):</span>
            <input name="filter" type="text" />
          </label>
          <br />
          <label onChange={() => this.onChange(event)}>
            <span>Quantity:</span>
            <input name="quantity" type="text" />
          </label>
          <button type="submit">Add Product</button>
        </form>
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
    },
    addProduct: (product) => {
      dispatch(addNewProduct(product))
    }
  }
}

const connectedAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)

export default connectedAdminPage
