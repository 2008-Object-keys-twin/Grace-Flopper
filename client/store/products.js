import axios from "axios"

//ACTION CONSTANT
const GET_PRODUCTS = "GET_PRODUCTS"
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT"
const EDIT_PRODUCT = "EDIT_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"

//ACTION CREATOR
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = (newProduct) => ({
  type: ADD_NEW_PRODUCT,
  newProduct
})

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product
})

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product
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
    const { data: addedProduct } = await axios.post("/api/products", newProduct)
    dispatch(addProduct(addedProduct))
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = (product, user) => async (dispatch) => {
  try {
    const data = await axios.put("/api/:productId/update", { product, user })
    dispatch(editProduct(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteAProduct = (product, user) => async (dispatch) => {
  try {
    await axios.delete("/api/products", {
      data: {
        product,
        user
      }
    })
    dispatch(deleteProduct(product))
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
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.id === action.product.id) {
          product = action.product
        }
        return product
      })
    case DELETE_PRODUCT:
      return state.filter(function(product) {
        return product.id !== action.product.id
      })
    default:
      return state
  }
}
