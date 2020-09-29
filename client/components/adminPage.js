import React from "react"
import { connect } from "react-redux"
import { fetchAllUsers, addNewProduct } from "../store"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"

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
    this.props.fetchUsers(this.props.isAdmin)
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
    this.setState({ price: this.state.price * 100 })
    this.props.addProduct(this.state)
  }

  render() {
    if (this.props.allUsers.length) {
      return (
        <div>
          <Container>
            <h1>Here's the adminPage!</h1>
            <h2>User details</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>User ID #</th>
                  <th>User email</th>
                  <th>Date Joined</th>
                  <th>Administrator</th>
                </tr>
              </thead>
              <tbody>
                {this.props.allUsers.length &&
                  this.props.allUsers.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt.slice(0, 10)}</td>
                        <td>{`${user.isAdmin}`}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Container>
          <hr />
          <h2>Add new products to the database</h2>
          <Container>
            <Form
              id="add-product-form"
              onSubmit={(event) => this.handleSubmit(event)}
            >
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Product name:</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Product name"
                />
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Color:</Form.Label>
                <Form.Control name="color" type="text" placeholder="Color" />
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Price:</Form.Label>
                <Form.Control name="price" type="text" placeholder="$$$" />
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                  name="imageUrl"
                  type="text"
                  placeholder="http://example.com"
                />
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Size:</Form.Label>
                <Form.Control as="select" name="size" type="text">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </Form.Control>
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Filters:</Form.Label>
                <Form.Control as="select" name="filter" type="text">
                  <option>women</option>
                  <option>men</option>
                  <option>children</option>
                </Form.Control>
              </Form.Group>
              <Form.Group onChange={() => this.onChange(event)}>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control name="quantity" type="text" />
              </Form.Group>
              <Button type="submit">Add Product</Button>
            </Form>
          </Container>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.user.allUsers,
  isAdmin: state.user.user.isAdmin
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
