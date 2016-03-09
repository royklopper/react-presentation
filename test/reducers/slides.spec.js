import expect     from 'expect'
import slides     from '../../src/js/reducers/slides'
import * as types from '../../src/js/constants/ActionTypes'

const addSlide = {
  type:         types.ADD_SLIDE,
  title:        'Title',
  description:  'Description',
  img:          'img'
}

const addSlideResult = {
  id:          0,
  title:       'Title',
  description: 'Description',
  img:         'img'
}

describe('slides reducer', () => {
  it('should handle initial state', () => {
    expect(
      slides(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_SLIDE', () => {
    expect(
      slides([], addSlide)
    ).toEqual([addSlideResult])

    expect(
      slides([
        {
          title:        'Title 1',
          description:  'Description',
          img:          'img',
          id:           0
        }
      ], addSlide)
    ).toEqual([
      {
        title:        'Title 1',
        description:  'Description',
        img:          'img',
        id:           0
      },
      {
        title:       'Title',
        description: 'Description',
        img:         'img',
        id:           1
      }
    ])
  })

  it('should handle DELETE_SLIDE', () => {
    expect(
      slides([
        {
          title:        'Title 1',
          description:  'Description',
          img:          'img',
          id:           0
        }
      ], {
        type: types.DELETE_SLIDE,
        id:   0
      })
    ).toEqual([])
  })

  it('should handle EDIT_SLIDE', () => {
    expect(
      slides([
        {
          title:        'Title 1',
          description:  'Description',
          img:          'img',
          id:           0
        }
      ], {
        type:       types.EDIT_SLIDE,
        title:      'EDIT TITLE',
        description:'EDIT_DESCRIPTION',
        img:        '',
        id:         0
      })
    ).toEqual([
      {
        title:      'EDIT TITLE',
        description:'EDIT_DESCRIPTION',
        img:        '',
        id:         0
      }
    ])
  })

  it('should handle CLEAR_SLIDES', () => {
    expect(
      slides([
        {
          title:        'Title 1',
          description:  'Description',
          img:          'img',
          id:           0
        },
        {
          title:       'Title',
          description: 'Description',
          img:         'img',
          id:           1
        }
      ], {
        type: types.CLEAR_SLIDES
      })
    ).toEqual([])
  })
})
