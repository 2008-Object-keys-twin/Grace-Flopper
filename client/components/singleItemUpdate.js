import React from "react"
import { connect } from "react-redux"
import { updateProduct } from "../store"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

class UpdateItemPage extends React.Component {
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
    this.props.update(this.state)
  }

  render() {
    return (
      <>
        <Container>
          <Form
            id="update-product-form"
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
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product
})

const mapDispatchToProps = (dispatch) => {
  return {
    update: (product) => {
      dispatch(updateProduct(product))
    }
  }
}

const connectedUpdateItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateItemPage)

export default connectedUpdateItem
