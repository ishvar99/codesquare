import { createStore, applyMiddleware } from "redux"
import {Types} from './action-types'
import thunk from "redux-thunk"
import rootReducer from "./reducers"
const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
)
store.dispatch(
  {
    type:Types.INSERT_CELL_AFTER,
    payload:{id:null,type:"code"},
  },)
  store.dispatch(
    {
      type:Types.INSERT_CELL_AFTER,
      payload:{id:null,type:"text"},
    },)
export default store