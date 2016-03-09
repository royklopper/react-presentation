/* Import dependencies */
import * as types from '../constants/ActionTypes'

/**
 * @param  {String} title
 * @param  {String} description
 * @param  {String} img
 * @return {Object}
 */
export function addSlide(title, description, img) {
  return { type: types.ADD_SLIDE, title, description, img }
}

/**
 * @param  {Nunber} id
 * @return {Object}
 */
export function deleteSlide(id) {
  return { type: types.DELETE_SLIDE, id }
}

/**
 * @param  {Nunber} id
 * @param  {String} title
 * @param  {String} description
 * @param  {String} img
 * @return {Object}
 */
export function editSlide(id, title, description, img) {
  return { type: types.EDIT_SLIDE, id, title, description, img }
}

/**
 * @return {Object}
 */
export function clearSlides() {
  return { type: types.CLEAR_SLIDES }
}
