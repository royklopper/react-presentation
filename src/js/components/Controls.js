/* Imports */
import React, { Component, PropTypes} from 'react'
import { browserHistory }             from 'react-router'
import Navbar                         from 'react-bootstrap/lib/Navbar'
import Nav                            from 'react-bootstrap/lib/Nav'
import NavItem                        from 'react-bootstrap/lib/NavItem'
import Glyphicon                      from 'react-bootstrap/lib/Glyphicon'
import OverlayTrigger                 from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip                        from 'react-bootstrap/lib/Tooltip'
import { LinkContainer }              from 'react-router-bootstrap'

class Controls extends React.Component {
  /**
   * Detect keystrokes so we can navigate the slides
   */
  componentDidMount() {
    document.addEventListener('keydown', this.detectKeystroke.bind(this))
  }

  /**
   * Remove the keystrokes changes event listener
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.detectKeystroke.bind(this))
  }

  /**
   * Navigate the presentation by using keyboard
   * @param  {Object} e
   */
  detectKeystroke(e) {
    let slideId
    switch(e.keyCode) {
      case 37:
        slideId = this.getPrevId()
        break
      case 39:
        slideId = this.getNextId()
        break
      default:
        return
    }
    browserHistory.push('/slides/' + slideId)
  }

  /**
   * Return the slide ID by its index
   * @param  {Number} index
   * @return {Number}
   */
  getSlideId(index) {
    return this.props.slides[index].id
  }

  /**
   * Return the first slide ID
   * @return {Number}
   */
  getFirstId() {
    return this.getSlideId(0)
  }

  /**
   * Return the previous slide ID
   * @return {Number}
   */
  getPrevId() {
    if (this.props.index > 0) {
      return this.getSlideId(this.props.index - 1)
    }
    return this.getSlideId(this.props.index)
  }

  /**
   * Return the next slide ID
   * @return {Number}
   */
  getNextId() {
    if (typeof this.props.slides[this.props.index + 1] !== 'undefined') {
      return this.getSlideId(this.props.index + 1)
    }
    return this.getSlideId(this.props.index)
  }

  /**
   * Return the last slide ID
   * @return {Number}
   */
  getLastId() {
    return this.getSlideId(this.props.slides.length - 1)
  }

  /**
   * Render the navigation bar, use react-bootstrap
   * for the elements.
   */
  render() {
    /* @type {Object} */
    const deleteSlideTooltip = (
      <Tooltip id="a-delete-slide">Delete the current slide</Tooltip>
    )

    /* @type {Object} */
    const toggleEditModeTooltip = (
      <Tooltip id="a-edit-slide">Toggle edit mode</Tooltip>
    )

    /* @type {Object} */
    const goToBeginTooltip = (
      <Tooltip id="nav-first-slide">View the first slide</Tooltip>
    )

    /* @type {Object} */
    const goToPrevTooltip = (
      <Tooltip id="nav-prev-slide">View the previous slide</Tooltip>
    )

    /* @type {Object} */
    const goToNextTooltip = (
      <Tooltip id="nav-next-slide">View the next slide</Tooltip>
    )

    /* @type {Object} */
    const goToEndTooltip = (
      <Tooltip id="nav-last-slide">View the last slide</Tooltip>
    )

    return (
      <Navbar fluid fixedBottom className="controls__wrapper hide-on-fullscreen">
        <Navbar.Text className="controls">
          <OverlayTrigger placement="top" overlay={deleteSlideTooltip}>
            <Navbar.Link eventKey={2} className="controls__control" href="#" onClick={this.props.onDelete}>
              <Glyphicon glyph="remove-sign" />
            </Navbar.Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={toggleEditModeTooltip}>
            <Navbar.Link eventKey={2} className="controls__control" href="#" onClick={this.props.onModeChange}>
              <Glyphicon glyph="edit" />
            </Navbar.Link>
          </OverlayTrigger>
          <span className="controls__state">
            <span className="hidden-sm hidden-xs">Showing slide </span>{this.props.index + 1} / {this.props.slides.length}
          </span>
          <OverlayTrigger placement="top" overlay={goToBeginTooltip}>
            <LinkContainer to={`/slides/${this.getFirstId()}`}>
              <Navbar.Link eventKey={2} className="controls__control">
                <Glyphicon glyph="fast-backward" />
              </Navbar.Link>
            </LinkContainer>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={goToPrevTooltip}>
            <LinkContainer to={`/slides/${this.getPrevId()}`}>
              <Navbar.Link eventKey={2} className="controls__control">
                <Glyphicon glyph="step-backward" />
              </Navbar.Link>
            </LinkContainer>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={goToNextTooltip}>
            <LinkContainer to={`/slides/${this.getNextId()}`}>
              <Navbar.Link eventKey={2} className="controls__control">
                <Glyphicon glyph="step-forward" />
              </Navbar.Link>
            </LinkContainer>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={goToEndTooltip}>
            <LinkContainer to={`/slides/${this.getLastId()}`}>
              <Navbar.Link eventKey={2} className="controls__control">
                <Glyphicon glyph="fast-forward" />
              </Navbar.Link>
            </LinkContainer>
          </OverlayTrigger>
        </Navbar.Text>
      </Navbar>
    )
  }
}

/* PropTypes for form */
Controls.propTypes = {
  slides:       PropTypes.array.isRequired,
  index:        PropTypes.number.isRequired,
  onModeChange: PropTypes.func.isRequired,
  onDelete:     PropTypes.func.isRequired
}

export default Controls
