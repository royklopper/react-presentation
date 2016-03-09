/* Import dependencies */
import React, { Component}    from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { browserHistory }     from 'react-router'
import Jumbotron              from 'react-bootstrap/lib/Jumbotron'
import Button                 from 'react-bootstrap/lib/Button'
import { LinkContainer }      from 'react-router-bootstrap'
import ReactMarkdown          from 'react-markdown'
import Controls               from '../components/Controls'
import Form                   from '../components/Form'
import * as SlideActions      from '../actions'

class Deck extends Component {
  /**
   * @param  {Object} props
   * @param  {Object} context
   */
  constructor(props, context) {
    super(props, context)

    /* Set the default state */
    this.state = {
      editMode: false
    }
  }

  /**
   * Return the current slide id, I used some hacky way
   * to accept `last` parameter as IDs to show
   * the proper view.
   * @return {Number|null}
   */
  getSlideId() {
    if (this.props.routeParams.id === 'last') {
      if (!this.props.slides.length) {
        return null
      }
      return this.props.slides[this.props.slides.length - 1].id
    }
    return this.props.routeParams.id || null
  }

  /**
   * WHen the form is saved, call the proper action
   * and refresh the page / or turn off edit mode.
   * @param  {String} title
   * @param  {String} description
   * @param  {String} img
   */
  onFormSave(title, description, img) {
    /* Edit the selected slide */
    this.props.actions.editSlide(this.getSlideId(), title, description, img)
  }

  /**
   * Change edit mode
   */
  onModeChange() {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  /**
   * Delete a specific slide
   * @todo Determine previous slide
   */
  onDelete() {
    this.props.actions.deleteSlide(this.getSlideId())
    browserHistory.push('/slides/0')
  }

  /**
   * Render the introduction HTML, used when accessing this component
   * without a slide ID
   */
  renderIntro() {
    let viewSlide = ''
    if (this.props.slides.length) {
      viewSlide = (
        <LinkContainer to={`/slides/${this.props.slides[0].id}`}>
          <Button className="deck__start" bsSize="large">View first slide</Button>
        </LinkContainer>
      )
    }
    return (
      <Jumbotron className="intro" id="fullscreen">
        <h1>Hello, world!</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p>
          {viewSlide}
          <LinkContainer to="/slides/create">
            <Button bsStyle="primary" bsSize="large">Create a new slide</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    )
  }

  /**
   * Render the slide form
   * @param {Object} slide
   */
  renderForm(slide) {
    return (
      <Jumbotron className="intro" id="fullscreen">
        <Form onSave={this.onFormSave.bind(this)} title={slide.title} description={slide.description} />
        <Controls slides={this.props.slides} index={this.props.slides.indexOf(slide)} onModeChange={this.onModeChange.bind(this)} onDelete={this.onDelete.bind(this)} />
      </Jumbotron>
    )
  }

  /**
   * Render the slide view
   * @param {Object} slide
   */
  renderSlide(slide) {
    let styles
    if (slide.img) {
      styles = {
        backgroundImage:    `url(${slide.img})`,
        backgroundRepeat:   'no-repeat',
        backgroundPosition: '0 0',
        backgroundSize:     'cover'
      }
    }

    return (
      <Jumbotron className="deck" id="fullscreen" style={styles}>
        <div className="deck__slide">
          <h1 className="deck__title">{slide.title}</h1>
          <ReactMarkdown className="deck__description" source={slide.description} />
        </div>
        <Controls slides={this.props.slides} index={this.props.slides.indexOf(slide)} onModeChange={this.onModeChange.bind(this)} onDelete={this.onDelete.bind(this)} />
      </Jumbotron>
    )
  }

  /**
   * Render the component
   */
  render() {
    /* @type {Number|null} */
    let slideId = this.getSlideId()
    if (null === slideId) {
      return this.renderIntro()
    }

    /* @type {Object} */
    let slide = this.props.slides.find((slide) => slide.id == slideId)
    if (!slide) {
      return this.renderIntro()
    }

    if (this.state.editMode) {
      return this.renderForm(slide)
    }

    return this.renderSlide(slide)
  }
}

/* @type {Function} */
const mapStateToProps = (state) => {
  return {
    slides: state.slides
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
  mapStateToProps,
  mapDispatchToProps
)(Deck)
