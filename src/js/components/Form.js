/* Import dependencies */
import React, { Component, PropTypes }  from 'react'
import Button                           from 'react-bootstrap/lib/Button'
import Input                            from 'react-bootstrap/lib/Input'

class Form extends Component {
  /**
   * @param  {Object} props
   * @param  {Object} context
   */
  constructor(props, context) {
    super(props, context)

    /* Set the default state */
    this.state = {
      isDirty:      false,
      title:        this.props.title || '',
      description:  this.props.description || '',
      img:          this.props.img || ''
    }
  }

  /**
   * Set the state when loading new props
   * @param  {Object} props
   */
  componentWillReceiveProps(props) {
    this.setState({
      title:        props.title,
      description:  props.description,
      img:          props.img,
      isDirty:      false
    })
  }

  /**
   * Handle the form submission
   * @param  {Object} e
   */
  handleSubmit(e) {
    e.preventDefault()

    /* Validate existence */
    if (!this.state.title || !this.state.description) {
      return
    }

    /* Save the form */
    this.props.onSave(
      this.state.title,
      this.state.description,
      this.state.img
    )
  }

  /**
   * Handle the input change
   * @param  {String} key
   * @param  {Event}  e
   */
  handleChange(key, e) {
    this.state[key]     = this.refs[key].getValue()
    this.state.isDirty  = true

    this.setState(this.state)
  }

  handleFileUpload(e) {
    /* @type {Array} */
    const files = e.target.files;

    /* Loop through filelist */
    for (let i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) continue

      /* @type {Object} */
      const reader = new FileReader()

      /* Add onload function */
      reader.onload = (file) => {
        this.state.img      = file.target.result
        this.state.isDirty  = true
        this.setState(this.state)
      }
      reader.readAsDataURL(f);
    }
  }

  /**
   * Render the form
   */
  render() {
    /* @type {Object} */
    let button = (<Button bsStyle="primary" bsSize="large" type="submit" block disabled>Slide up-to-date</Button>)
    if (this.state.isDirty) {
      button = (<Button bsStyle="primary" bsSize="large" type="submit" block>Save slide</Button>)
    }

    return (
      <form className="container" onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text" bsSize="large" placeholder="Enter a title for the slide" onChange={this.handleChange.bind(this, 'title')} value={this.state.title} ref="title" />
        <Input type="textarea" bsSize="large" rows="20" placeholder="Write some markdown for the slide's content" onChange={this.handleChange.bind(this, 'description')} value={this.state.description} ref="description" />
        <Input type="file" onChange={this.handleFileUpload.bind(this)} label="Upload a new background image" />
        {button}
      </form>
    )
  }
}

/* PropTypes for form */
Form.propTypes = {
  onSave:       PropTypes.func.isRequired,
  title:        PropTypes.string,
  description:  PropTypes.string
}

export default Form
