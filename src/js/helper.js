import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SlideActions      from './actions'

export default (object) => {
  /* @type {Object} Set application propTypes, pass along slides and actions */
  object.propTypes = {
    slides:   PropTypes.array.isRequired,
    actions:  PropTypes.object.isRequired
  }

  /**
   * Map the state params to the App
   * @param  {Object} state
   * @return {Object}
   */
  function mapStateToProps(state) {
    return {
      slides: state.slides
    }
  }

  /**
   * Map the dispatcher to the SlideActions
   * @param  {Function} dispatch
   * @return {Object}
   */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(SlideActions, dispatch)
    }
  }

  /* Expose composed Application */
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(object)
}
