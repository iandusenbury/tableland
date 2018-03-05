import { Route } from 'react-router-dom'

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConnectedApp from '../../components/app'

import { routePathToComponent } from '../../constants/routing'
import { mountComponent } from '../constants'

Enzyme.configure({ adapter: new Adapter() })

//  Test Suite  //

describe('routing to correct components', () => {
  let wrapper

  it('route object names are not undefined or empty', () => {
    const routes = routePathToComponent

    routes.forEach(route => {
      expect(route.name).not.toBe(undefined)
      expect(route.name).not.toBe('')
    })
  })

  it('routes object names are unique', () => {
    const routes = routePathToComponent

    const routeKeys = routes.map(route => route.name)
    const isDuplicate = routeKeys.some(
      (item, idx) => routeKeys.indexOf(item) !== idx
    )
    expect(isDuplicate).toEqual(false)
  })

  it('routes are not undefined or empty', () => {
    const routes = routePathToComponent

    routes.forEach(route => {
      expect(route.path).not.toBe(undefined)
      expect(route.path).not.toBe('')
    })
  })

  it('components are not undefined', () => {
    const routes = routePathToComponent

    routes.forEach(route => {
      expect(route.component).not.toBe(undefined)
    })
  })

  it('renders correct routes', () => {
    wrapper = mount(mountComponent(ConnectedApp))
    const expectedRoutes = routePathToComponent

    /* eslint no-param-reassign: ["error", { "props": false }] */
    const pathMap = wrapper.find(Route).reduce((map, route) => {
      const routeProps = route.props()
      map[routeProps.path] = routeProps.component // Linter exception for this line
      return map
    }, {})

    expectedRoutes.forEach(expectedRoute => {
      expect(pathMap[expectedRoute.path]).toBe(expectedRoute.component)
    })
  })
})
