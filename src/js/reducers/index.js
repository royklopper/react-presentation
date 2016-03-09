/* Import dependencies */
import { combineReducers }  from 'redux'
import { routerReducer }    from 'react-router-redux'
import slides               from './slides'

/* @type {Object} Combine reducers */
const rootReducer = combineReducers({
  slides,
  routing: routerReducer
})

/* Expose `reducers` */
export default rootReducer
