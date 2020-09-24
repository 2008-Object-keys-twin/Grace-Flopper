import React from "react"
import { connect } from "react-redux"

class SingleItemView extends React.Component {
  render() {
    const [thisItem] = this.props.items.filter(
      (item) => item.id === +this.props.match.params.productId
    )
    return (
      <div>
        <p>Here is the item you were looking for: </p>
        {!thisItem ? <p>Loading...</p> : <p>{thisItem.name}</p>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.products
})

export default connect(mapStateToProps)(SingleItemView)
