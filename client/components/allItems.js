import React from "react"
import { connect } from "react-redux"
import { fetchProducts } from "../store/products"
import { Link } from "react-router-dom"

export class AllItems extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <>
        {this.props.products.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id}>
            <div>
              <p>{item.name}</p>
              <img src={item.imageUrl} />
              <div>
                <button type="button">Add to cart</button>
              </div>
            </div>
          </Link>
        ))}
      </>
    )
  }
}

const mapStatetoProps = (state) => ({
  products: state.products
})

const mapDispatchtoProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts())
})

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AllItems)
