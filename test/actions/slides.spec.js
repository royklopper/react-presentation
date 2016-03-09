import expect from 'expect'
import * as types   from '../../src/js/constants/ActionTypes'
import * as actions from '../../src/js/actions'

describe('Slide actions', () => {
  it('addSlide should create ADD_SLIDE action', () => {
    expect(actions.addSlide('Title', 'Description', 'Image')).toEqual({
      type:         types.ADD_SLIDE,
      title:        'Title',
      description:  'Description',
      img:          'Image'
    })
  })

  it('deleteSlide should create DELETE_SLIDE action', () => {
    expect(actions.deleteSlide(1)).toEqual({
      type: types.DELETE_SLIDE,
      id:   1
    })
  })

  it('editSlide should create EDIT_SLIDE action', () => {
    expect(actions.editSlide(1, 'Title', 'Description', 'Image')).toEqual({
      type:         types.EDIT_SLIDE,
      id:           1,
      title:        'Title',
      description:  'Description',
      img:          'Image'
    })
  })

  it('clearSlides should create CLEAR_SLIDES action', () => {
    expect(actions.clearSlides()).toEqual({
      type: types.CLEAR_SLIDES
    })
  })
})
