import React from "react"
import { connect } from "react-redux"
import { fetchProducts } from "../store/products"
import { Link } from "react-router-dom"
import { addToCart } from "../store/cart"
import { deleteAProduct } from "../store"

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
    this.props.updateCart(userId, itemId)
  }

  render() {
    const user = this.props.user
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
            {user.isAdmin ? (
              <button type="button" onClick={() => this.handleDelete(item)}>
                Delete
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
  updateCart: (userId, productId) => dispatch(addToCart(userId, productId)),
  delete: (product, user) => dispatch(deleteAProduct(product, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllItems)
