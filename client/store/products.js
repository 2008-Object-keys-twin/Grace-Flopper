import axios from "axios"

//ACTION CONSTANT
const GET_PRODUCTS = "GET_PRODUCTS"
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT"
const EDIT_PRODUCT = "EDIT_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
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

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product
})

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product
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

export const updateProduct = (product, id) => async (dispatch) => {
  try {
    const updated = await axios.put(`/api/products/${id}/update`, {
      product
    })
    console.log("This is thunk ---> ", updated)
    dispatch(editProduct(updated.data))
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
      return { ...state, allProducts: action.products }
    case ADD_NEW_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.newProduct]
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((product) => {
          if (product.id === action.product.id) {
            product = action.product
          }
          return product
        })
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(function(product) {
          return product.id !== action.product.id
        })
      }
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product }
    default:
      return state
  }
}
