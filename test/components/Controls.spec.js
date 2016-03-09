import expect       from 'expect'
import React        from 'react'
import TestUtils    from 'react-addons-test-utils'
import Controls     from '../../src/js/components/Controls'

function setup(propOverrides) {
  const props = Object.assign({
    slides: [
      {
        title:        'Title 1',
        description:  'Description 1',
        img:          'img1',
        id:           0
      },
      {
        title:       'Title 2',
        description: 'Description 2',
        img:         'img2',
        id:           1
      },
      {
        title:       'Title 3',
        description: 'Description 3',
        img:         'img3',
        id:           2
      },
      {
        title:       'Title 4',
        description: 'Description 4',
        img:         'img4',
        id:           3
      },
      {
        title:       'Title 5',
        description: 'Description 5',
        img:         'img5',
        id:           4
      }
    ],
    index:        0,
    onModeChange: expect.createSpy(),
    onDelete:     expect.createSpy()
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(<Controls {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Deck', () => {
    it('should render container', () => {
      const { output } = setup()
      expect(output.props.fixedBottom).toBe(true)
      expect(output.props.fluid).toBe(true)
      expect(output.props.className).toBe('controls__wrapper hide-on-fullscreen')
    })
  })
})
