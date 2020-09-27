import axios from "axios"

//ACTION CONSTANT
const GET_PRODUCTS = "GET_PRODUCTS"
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT"

//ACTION CREATOR
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = (newProduct) => ({
  type: ADD_NEW_PRODUCT,
  newProduct
})

//INITIAL STATE
const initialState = []

//THUNK CREATORS
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get("/api/products")
    dispatch(getProducts(products))
  } catch (err) {
    console.error(err)
  }
}

export const addNewProduct = (newProduct) => async (dispatch) => {
  try {
    console.log(`We've made it to the addNewProduct thunk!`)
    const { data: addedProduct } = await axios.post("/api/products", newProduct)
    dispatch(addProduct(addedProduct))
    console.log(`Now exiting thte addNewProduct thunk!`, addedProduct)
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_NEW_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}
