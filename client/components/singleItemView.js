import React from "react"
import { connect } from "react-redux"
import { fetchSingleProduct } from "../store/products"
import { addToCart } from "../store/cart"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

export class SingleItemView extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(itemId) {
    const userId = this.props.user.id
    this.props.updateCart(userId, itemId, this.props.products, this.props.cart)
  }
  componentDidMount() {
    if (!this.props.products.length) {
      this.props.getProduct(this.props.match.params.productId)
    }
  }

  render() {
    let thisItem
    if (this.props.products.length) {
      thisItem = this.props.products.filter(
        (item) => item.id === +this.props.match.params.productId
      )[0]
    } else {
      thisItem = this.props.singleProduct
    }
    const user = this.props.user
    return (
      <div>
        <h3>Here is the item you are looking for: </h3> <br />
        {!thisItem ? (
          <p>Loading...</p>
        ) : (
          <div className="product-container">
            <h4>{thisItem.name}</h4>
            <p>${thisItem.price / 100}</p>
            <p>Description: {thisItem.description}</p>
            <img src={thisItem.imageUrl} />
            <div>
              <Button
                type="button"
                onClick={() => this.handleClick(thisItem.id)}
              >
                Add to cart
              </Button>
              {user.isAdmin ? (
                <Link to={`/item/${thisItem.id}/update`}>Update</Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.allProducts,
  singleProduct: state.products.singleProduct,
  user: state.user.user,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  updateCart: (userId, productId, products, cart) =>
    dispatch(addToCart(userId, productId, products, cart)),
  getProduct: (productId) => dispatch(fetchSingleProduct(productId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItemView)
