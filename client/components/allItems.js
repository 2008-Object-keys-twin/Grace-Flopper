import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    console.log(this.props.products)
    return (
      <>
        <ul>
          {this.props.products.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
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
