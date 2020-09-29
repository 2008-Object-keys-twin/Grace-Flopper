import axios from "axios"
import history from "../history"

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"
const GET_ALL_USERS = "GET_ALL_USERS"

/**
 * INITIAL STATE
 */
const defaultUser = { user: {}, allUsers: [] }

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const getAllUsers = (allUsers) => ({ type: GET_ALL_USERS, allUsers })

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

export const fetchAllUsers = (adminCheck) => async (dispatch) => {
  try {
    const allUsers = await axios.get("/api/users/admin", {
      params: { isAdmin: adminCheck }
    })
    dispatch(getAllUsers(allUsers.data))
  } catch (error) {
    console.error("fetchAllUsers Thunk has an error", error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user }
    case REMOVE_USER:
      return { ...state, user: defaultUser.user }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.allUsers }
    default:
      return state
  }
}
