import React from "react"
import { connect } from "react-redux"

export class SingleItemView extends React.Component {
  render() {
    const [thisItem] = this.props.items.filter(
      (item) => item.id === +this.props.match.params.productId
    )
    console.log(thisItem)
    return (
      <div>
        <h3>Here is the item you were looking for: </h3>
        {!thisItem ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{thisItem.name}</p>
            <p>{thisItem.description}</p>
            <img src={thisItem.imageUrl} />
            <div>
              <button type="button">Add to cart</button>
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.products
})

export default connect(mapStateToProps)(SingleItemView)
