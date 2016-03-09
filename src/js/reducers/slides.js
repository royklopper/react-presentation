/* Import dependencies */
import { ADD_SLIDE, DELETE_SLIDE, EDIT_SLIDE, CLEAR_SLIDES } from '../constants/ActionTypes'

/* @type {Array} */
const initialState = []

export default (state = initialState, action) => {
  /**
   * Switch the current action to reduce properly
   */
  switch (action.type) {
    /* Add a new slide */
    case ADD_SLIDE:
      return [
        ...state,
        {
          id:           state.reduce((maxId, slide) => Math.max(slide.id, maxId), -1) + 1,
          title:        action.title,
          description:  action.description,
          img:          action.img
        }
      ]

    /* Delete a single slide by its ID */
    case DELETE_SLIDE:
      return state.filter(slide => slide.id != parseInt(action.id))

    /* Edit a slide's properties */
    case EDIT_SLIDE:
      return state.map(slide => {
        if (slide.id == parseInt(action.id)) {
          console.log(action)
          slide.title       = action.title
          slide.description = action.description,
          slide.img         = action.img
        }
        return slide
      })

    /* Clear all slides */
    case CLEAR_SLIDES:
      return []

    default:
      return state
  }
}
