import axios from "axios"

//Action Types

const GET_CART = "GET_CART"
const ADD_NEW_TO_CART = "ADD_NEW_TO_CART"
const ADD_EXISTING_TO_CART = "ADD_EXISTING_TO_CART"

//Inital State

const initialCart = []

//Action Creators

const getCart = (cart) => ({ type: GET_CART, cart })
const addNewCart = (item) => ({ type: ADD_NEW_TO_CART, item })
const incrementCart = (productId) => ({ type: ADD_EXISTING_TO_CART, productId })

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
    const res = await axios.put("/api/cart", id)
    if (typeof res === "number") {
      dispatch(incrementCart(res))
    } else {
      dispatch(addCart(res))
    }
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
      return [...state, action.item] // [1,2,3, 4]
    case ADD_EXISTING_TO_CART:
      return state.map(function(item) {
        if (item.productId === action.productId) {
          item.quantity++
        }
      })
    default:
      return state
  }
}
