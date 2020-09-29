import React from "react"
import { connect } from "react-redux"
import { fetchProducts } from "../store/products"
import { Link } from "react-router-dom"
import { addToCart } from "../store/cart"
import { deleteAProduct } from "../store"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"

export class AllItems extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  handleDelete(item) {
    const user = this.props.user
    this.props.delete(item, user)
  }

  handleClick(itemId) {
    const userId = this.props.user.id
    this.props.updateCart(userId, itemId, this.props.products, this.props.cart)
  }

  render() {
    const user = this.props.user
    return (
      <div className="all-products-container">
        {this.props.products.map((item) => (
          <div className="product-container" key={item.id}>
            <Link to={`/item/${item.id}`}>
              <div>
                <h5>{item.name}</h5>
                <Image src={item.imageUrl} rounded />
              </div>
            </Link>

            <p>${item.price}</p>
            <div id="buttons-allItems">
              <Button type="button" onClick={() => this.handleClick(item.id)}>
                Add to cart
              </Button>

              {user.isAdmin && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => this.handleDelete(item)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.allProducts,
  user: state.user.user,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
  delete: (product, user) => dispatch(deleteAProduct(product, user)),
  updateCart: (userId, productId, products, cart) =>
    dispatch(addToCart(userId, productId, products, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllItems)
