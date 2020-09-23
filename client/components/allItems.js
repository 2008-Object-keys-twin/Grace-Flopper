import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <>
        {this.props.products.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <img src={item.imageUrl} />
            <div>
              <button type="button">Add to cart</button>
            </div>
          </div>
        ))}
      </>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.products
})

const mapDispatchtoProps = dispatch => ({
  getAllProducts: () => dispatch(fetchProducts())
})

export default connect(mapStatetoProps, mapDispatchtoProps)(AllItems)
