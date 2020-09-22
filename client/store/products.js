import axios from 'axios'
import dummyData from '../components/dummyData'

//ACTION CONSTANT
const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATOR
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//INITIAL STATE
const initialState = []

//THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    dispatch(getProducts(dummyData))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
