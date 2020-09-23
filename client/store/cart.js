import axios from 'axios'

//Action Types

const GET_CART = 'GET_CART'

//Inital State

const initialCart = []

//Action Creators

const getCart = cart => ({type: GET_CART, cart})

//Thunk Creator

export const loadCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    console.log('this is what is in the thunk', res.data[0].products)
    dispatch(getCart(res.data[0].products))
  } catch (err) {
    console.error('error is in cart get thunk', err)
  }
}

//reducer
export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
