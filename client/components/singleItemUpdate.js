import React from "react"
import { connect } from "react-redux"
import { updateProduct } from "../store"
import { fetchSingleProduct } from "../store/products"

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
    this.props.update(this.state, this.props.singleProduct.id)
  }

  render() {
    const { data } = this.props.allUsers || []
    return (
      <div>
        <h2>Update Product in database</h2>
        <form
          id="update-product-form"
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
