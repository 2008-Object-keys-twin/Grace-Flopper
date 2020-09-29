import React from "react"
import { connect } from "react-redux"
import { updateProduct } from "../store"
import { fetchSingleProduct } from "../store/products"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

class UpdateItemPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      description: "",
      color: "",
      price: 0,
      quantity: 0,
      filter: "",
      imageUrl: "",
      size: ""
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
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
    this.props.update(
      {
        name: this.state.name || this.props.singleProduct.name,
        description:
          this.state.description || this.props.singleProduct.description,
        color: this.state.color || this.props.singleProduct.color,
        price: this.state.price || this.props.singleProduct.price,
        quantity: this.state.quantity || this.props.singleProduct.quantity,
        filter: [this.state.filter] || this.props.singleProduct.filter,
        imageUrl: this.state.imageUrl || this.props.singleProduct.imageUrl,
        size: this.state.size || this.props.singleProduct.size
      },
      this.props.singleProduct.id
    )
  }

  render() {
    const { data } = this.props.allUsers || []
    return (
      <div>
        <h2>Update Product in database</h2>
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
              {this.props.singleProduct.name}
            </Form.Group>
            <Form.Group onChange={() => this.onChange(event)}>
              <Form.Label>Price:</Form.Label>
              <Form.Control name="price" type="text" placeholder="$$$" />
            </Form.Group>
            <Form.Group onChange={() => this.onChange(event)}>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Description"
              />
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
            <Button type="submit">Update Product</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  singleProduct: state.products.singleProduct
})

const mapDispatchToProps = (dispatch) => {
  return {
    update: (product, id) => {
      dispatch(updateProduct(product, id))
    },
    getProduct: (productId) => dispatch(fetchSingleProduct(productId))
  }
}

const connectedUpdateItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateItemPage)

export default connectedUpdateItem
