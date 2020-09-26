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
    this.props.updateCart(userId, itemId)
  }

  render() {
    console.log("render(): this.props.user -----> ", this.props.user.id)
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

const mapStatetoProps = (state) => ({
  products: state.products,
  user: state.user
})

const mapDispatchtoProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
  updateCart: (userId, productId) => dispatch(addToCart(userId, productId))
})

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AllItems)
