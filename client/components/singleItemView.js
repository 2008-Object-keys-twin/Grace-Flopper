import React from "react"
import { connect } from "react-redux"
import { addToCart } from "../store/cart"
import { deleteAProduct } from "../store"

export class SingleItemView extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleClick(itemId) {
    const userId = this.props.user.id
    this.props.updateCart(userId, itemId)
  }

  handleDelete(item) {
    const user = this.props.user
    this.props.delete(item, user)
    console.log("what?")
  }

  render() {
    const [thisItem] = this.props.products.filter(
      (item) => item.id === +this.props.match.params.productId
    )
    const user = this.props.user
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
              {user.isAdmin ? (
                <button
                  type="button"
                  onClick={() => this.handleDelete(thisItem)}
                >
                  Delete
                </button>
              ) : (
                <div />
              )}
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  updateCart: (userId, productId) => dispatch(addToCart(userId, productId)),
  delete: (product, user) => dispatch(deleteAProduct(product, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemView)
