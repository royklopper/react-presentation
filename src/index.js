/* Import dependencies */
import WebFont                  from 'webfontloader'
import React                    from 'react'
import { render }               from 'react-dom'
import { Provider }             from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import App                      from './js/containers/App'
import Deck                     from './js/containers/Deck'
import Create                   from './js/containers/Create'
import configureStore           from './js/store/configureStore'

/* Router */
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

/* @type {Function} */
const store = configureStore()

/* @type {Object} */
const history = syncHistoryWithStore(browserHistory, store)

/* Initialze webfonts */
WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif', 'Droid Sans Mono']
  }
})

/* Render shadow DOM */
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/slides" />
        <Route path="slides" component={Deck} />
        <Route path="slides/create" component={Create} />
        <Route path="slides/:id" component={Deck} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
