import React from "react"
import { connect } from "react-redux"
import { addToCart } from "../store/cart"

export class SingleItemView extends React.Component {
  constructor() {
    super()
    this.state = {
      singleItem: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(itemId) {
    const userId = this.props.user.id
    this.props.updateCart(userId, itemId, this.props.products, this.props.cart)
  }
  componentDidMount() {
    if (!this.props.products.length) {
      // need to dispatch a thunk to get an individual product and put it on state
    }
  }

  render() {
    const [thisItem] = this.props.products.filter(
      (item) => item.id === +this.props.match.params.productId
    )
    return (
      <div>
        <h3>Here is the item you were looking for: </h3>
        {!thisItem ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{thisItem.name}</p>
            <h5>{thisItem.description}</h5>
            <img src={thisItem.imageUrl} />
            <div>
              <button
                type="button"
                onClick={() => this.handleClick(thisItem.id)}
              >
                Add to cart
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  updateCart: (userId, productId, products, cart) =>
    dispatch(addToCart(userId, productId, products, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItemView)
