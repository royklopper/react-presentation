/* Import dependencies */
import React, { Component}  from 'react'
import Header               from '../components/Header'

class App extends Component {
  /* Render the application */
  render() {
    return (
      <section className="content">
        <Header />
        {this.props.children}
      </section>
    )
  }
}

/* Expose `App` */
export default App
