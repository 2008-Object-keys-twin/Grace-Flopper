import axios from "axios"
import history from "../history"

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"
const ISADMIN_USER = "ISADMIN_USER"
const GET_ALL_USERS = "GET_ALL_USERS"

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const isAdminUser = (user) => ({ type: ISADMIN_USER, user })
const getAllUsers = (user) => ({ type: GET_ALL_USERS, user })

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me")
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push("/home")
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout")
    dispatch(removeUser())
    history.push("/login")
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = (check) => async (dispatch) => {
  try {
    console.log("I AM IN THE THUNK", check)
    const allUsers = await axios.get("/api/users/admin", {
      params: { isAdmin: check }
    })
    dispatch(getAllUsers(allUsers))
  } catch (error) {
    console.error("fetchAllUsers Thunk has an error", error)
  }
}

export const isAdmin = (id) => async (dispatch) => {
  try {
    const admin = await axios.get(`/api/users/${id}`)
    console.log("THIS IS THE THUNK ADMIN REQUEST ----->", admin)
    dispatch(isAdminUser(admin))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case ISADMIN_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_ALL_USERS:
      return action.user
    default:
      return state
  }
}
