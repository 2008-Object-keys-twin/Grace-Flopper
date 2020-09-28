import axios from "axios"

//ACTION CONSTANT
const GET_PRODUCTS = "GET_PRODUCTS"
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT"
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"

//ACTION CREATOR
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = (newProduct) => ({
  type: ADD_NEW_PRODUCT,
  newProduct
})

const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//INITIAL STATE
const initialState = { allProducts: [], singleProduct: {} }

//THUNK CREATORS
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get("/api/products")
    dispatch(getProducts(products))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    const { data: product } = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(product))
  } catch (error) {
    console.error(error)
  }
}

export const addNewProduct = (newProduct) => async (dispatch) => {
  try {
    const { data: addedProduct } = await axios.post("/api/products", newProduct)
    dispatch(addProduct(addedProduct))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, allProducts: action.products }
    case ADD_NEW_PRODUCT:
      return { ...state, allProducts: [...allProducts, action.newProduct] }
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product }
    default:
      return state
  }
}
