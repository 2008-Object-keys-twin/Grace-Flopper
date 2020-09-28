import React from "react"
import { connect } from "react-redux"
import { fetchProducts } from "../store/products"
import { Link } from "react-router-dom"
import { addToCart } from "../store/cart"

export class AllItems extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  handleClick(itemId) {
    const userId = this.props.user.id
    this.props.updateCart(userId, itemId, this.props.products, this.props.cart)
  }

  render() {
    return (
      <>
        {this.props.products.map((item) => (
          <div key={item.id}>
            <Link to={`/item/${item.id}`}>
              <div>
                <p>{item.name}</p>
                <img src={item.imageUrl} />
              </div>
            </Link>
            <div>
              <button type="button" onClick={() => this.handleClick(item.id)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </>
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
  updateCart: (userId, productId, products, cart) =>
    dispatch(addToCart(userId, productId, products, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllItems)
