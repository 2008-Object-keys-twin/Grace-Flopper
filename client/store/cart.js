import axios from "axios"

//Action Types

const GET_CART = "GET_CART"
const ADD_TO_CART = "ADD_TO_CART"

//Inital State

const initialCart = []

//Action Creators

const getCart = (cart) => ({ type: GET_CART, cart })
const addCart = (item) => ({ type: ADD_TO_CART, item })

//Thunk Creator

export const loadCart = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getCart(res.data[0].products))
  } catch (err) {
    console.error("error is in cart get thunk", err)
  }
}

export const addToCart = (id) => async (dispatch) => {
  try {
    await axios.put("/api/cart", id)
    dispatch(addCart(id))
  } catch (err) {
    console.error("error is in cart")
  }
}

//reducer
export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
