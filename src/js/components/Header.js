/* Imports */
import React                    from 'react'
import { connect }              from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Navbar                   from 'react-bootstrap/lib/Navbar'
import Nav                      from 'react-bootstrap/lib/Nav'
import NavItem                  from 'react-bootstrap/lib/NavItem'
import Glyphicon                from 'react-bootstrap/lib/Glyphicon'
import Button                   from 'react-bootstrap/lib/Button'
import OverlayTrigger           from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip                  from 'react-bootstrap/lib/Tooltip'
import { LinkContainer }        from 'react-router-bootstrap'
import screenfull               from 'screenfull'
import { clearSlides }          from '../actions'

class Header extends React.Component {
  /**
   * @param  {Object} props
   * @param  {Object} context
   */
  constructor(props, context) {
    super(props, context)
    this.state = {
      fullscreen: false
    }
  }

  /**
   * Detect fullscreen changes, set fullscreen className to the body
   */
  componentDidMount() {
    document.addEventListener(screenfull.raw.fullscreenchange, this.detectFullscreen.bind(this))
  }

  /**
   * Remove the fullscreen changes event listener
   */
  componentWillUnmount() {
    document.removeEventListener(screenfull.raw.fullscreenchange, this.detectFullscreen.bind(this))
  }

  /**
   * Detect full screen state
   */
  detectFullscreen() {
    /* @type {Bool} */
    let isFullscreen = true

    /* Check whether screen is fullscreen or not */
    if (screenfull.isFullscreen) {
      document.body.className = 'fullscreen'
    } else {
      document.body.className = ''
      isFullscreen = false
    }

    /* Set the proper state */
    this.setState({
      fullscreen: false
    })
  }

  /**
   * toggleFullscreen action, used when pressing the button
   * @param  {Object} e
   */
  toggleFullscreen(e) {
    e.preventDefault()

    /* Check whether to go fullscreen */
    if (!this.state.fullscreen) {
      screenfull.request()
    } else {
      screenfull.exit()
    }
  }

  /**
   * [clearAction description]
   * @return {[type]} [description]
   */
  clearAction() {
    this.props.dispatch(clearSlides())
    browserHistory.push('/slides')
  }

  /**
   * Render the navigation bar, use react-bootstrap
   * for the elements.
   */
  render() {
    /* @type {Object} */
    const goFullscreenTooltip = (
      <Tooltip id="a-go-fullscreen">View your presentation in fullscreen</Tooltip>
    )

    /* @type {Object} */
    const createSlideTooltip = (
      <Tooltip id="a-create-slide">Create a new slide</Tooltip>
    )

    return (
      <Navbar fluid fixedTop className="hide-on-fullscreen">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React-Bootstrap</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="header__action" eventKey={2} onClick={this.clearAction.bind(this)}>
              <Glyphicon glyph="trash" /> Reset
            </NavItem>
            <OverlayTrigger placement="bottom" overlay={createSlideTooltip}>
              <LinkContainer to="/slides/create">
                <NavItem className="header__action" eventKey={1}>
                  <Glyphicon glyph="plus-sign" />
                </NavItem>
              </LinkContainer>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={goFullscreenTooltip}>
              <NavItem className="header__action" eventKey={2} onClick={this.toggleFullscreen.bind(this)}>
                <Glyphicon glyph="fullscreen" />
              </NavItem>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connect()(Header)
