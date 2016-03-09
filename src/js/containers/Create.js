/* Import dependencies */
import React, { Component}    from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { browserHistory }     from 'react-router'
import Jumbotron              from 'react-bootstrap/lib/Jumbotron'
import Form                   from '../components/Form'
import * as SlideActions      from '../actions'

class Create extends Component {
  /**
   * @param  {Object} props
   * @param  {Object} context
   */
  constructor(props, context) {
    super(props, context)
  }

  /**
   * WHen the form is saved, call the proper action
   * and refresh the page / or turn off edit mode.
   * @param  {String} title
   * @param  {String} description
   * @param  {String} img
   */
  onFormSave(title, description, img) {
    /* Add a new slide */
    this.props.actions.addSlide(title, description, img)

    /* @todo figure out the last slide ID */
    browserHistory.push('/slides/last')
  }

  /**
   * [renderForm description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <Jumbotron className="deck" id="fullscreen">
        <Form onSave={this.onFormSave.bind(this)} />
      </Jumbotron>
    )
  }
}

/* @type {Function} */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SlideActions, dispatch)
  }
}

/* Connect the Slides with dispatcher and state */
export default connect(
  (state) => { return {}},
  mapDispatchToProps
)(Create)
