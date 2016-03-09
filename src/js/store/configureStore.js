/* Import dependencies */
import { compose, createStore } from 'redux'
import rootReducer              from '../reducers'
import persistState             from 'redux-localstorage'

/* Expose `configureStore` */
export default function configureStore(initialState) {
  /* @type {Function} Wrap the createStore to implement localStorage */
  const createPersistentStore = compose(
    persistState(['slides'], {key: 'blendle'})
  )(createStore)

  /* @type {Function} */
  const store = createPersistentStore(rootReducer, initialState)

  /* Hot module loading */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
