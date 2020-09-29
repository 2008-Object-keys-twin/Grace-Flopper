import axios from "axios"

//Action Types

const GET_CART = "GET_CART"
const ADD_NEW_TO_CART = "ADD_NEW_TO_CART"
const ADD_EXISTING_TO_CART = "ADD_EXISTING_TO_CART"
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART"
const EDIT_QUANTITY = "EDIT_QUANTITY"
const PLACED_ORDER = "PLACED_ORDER"

//Inital State

const initialCart = []

//Action Creators

const getCart = (cart) => ({ type: GET_CART, cart })
const addNewCart = (item) => ({ type: ADD_NEW_TO_CART, item })
const incrementCart = (productId) => ({ type: ADD_EXISTING_TO_CART, productId })
const removeFromCart = (productId) => ({
  type: REMOVE_ITEM_FROM_CART,
  productId
})
const updateQuantity = (quantity, productId) => ({
  type: EDIT_QUANTITY,
  quantity,
  productId
})
const orderSuccessful = () => ({
  type: PLACED_ORDER,
  initialCart
})

//Thunk Creator

export const loadCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/${id}`)
    dispatch(getCart(data))
  } catch (err) {
    console.error("error is in cart get thunk", err)
  }
}

export const addToCart = (userId, productId, products, cart) => async (
  dispatch
) => {
  try {
    if (userId) {
      // user is logged in
      const { data } = await axios.put("/api/cart", { userId, productId })
      if (typeof data === "number") {
        dispatch(incrementCart(data))
      } else {
        dispatch(addNewCart(data))
      }
    } else {
      const cartCheck = cart.filter((product) => product.id === productId)
      if (cartCheck.length) {
        dispatch(incrementCart(productId))
      } else {
        const [productToAdd] = products.filter(
          (product) => product.id === productId
        )
        const productToSend = {
          id: productToAdd.id,
          name: productToAdd.name,
          description: productToAdd.description,
          imageUrl: productToAdd.imageUrl,
          price: productToAdd.price,
          size: productToAdd.size,
          color: productToAdd.color,
          cart: {
            quantity: 1
          }
        }
        dispatch(addNewCart(productToSend))
      }
    }
  } catch (err) {
    console.error("error is in cart")
  }
}

export const removeItem = (userId, productId) => async (dispatch) => {
  try {
    if (userId) {
      await axios.delete("/api/cart", { params: { userId, productId } })
    }
    dispatch(removeFromCart(productId))
  } catch (error) {
    console.error("error in removing item")
  }
}

export const updateItemQuantity = (userId, productId, quantity) => async (
  dispatch
) => {
  try {
    if (userId) {
      await axios.put("/api/cart/update", { userId, productId, quantity })
    }
    dispatch(updateQuantity(quantity, productId))
  } catch (error) {
    console.error("error in updateItemQuantity thunk")
  }
}

export const placeOrder = (userId, cart) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/orders", { userId })
    const orderId = +data.id
    await axios.post("/api/orders/details", { userId, orderId, cart })
  } catch (error) {
    console.error("Failed to create order details. Please try again later")
  }
  if (userId) {
    try {
      await axios.delete(`/api/cart/flush/${userId}`)
    } catch (error) {
      console.error("Failed to flush cart")
    }
  }
  dispatch(orderSuccessful())
}

//reducer
export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_NEW_TO_CART:
      return [...state, action.item]
    case ADD_EXISTING_TO_CART:
      return state.map(function(item) {
        if (item.id === action.productId) {
          item.cart.quantity++
        }
        return item
      })
    case REMOVE_ITEM_FROM_CART:
      return state.filter(function(item) {
        return item.id !== action.productId
      })
    case EDIT_QUANTITY:
      return state.map(function(item) {
        if (item.id === action.productId) {
          item.cart.quantity = action.quantity
        }
        return item
      })
    case PLACED_ORDER:
      return action.initialCart
    default:
      return state
  }
}
