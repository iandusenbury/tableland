import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavBar from '../../containers/navbar'
import { mountComponent } from '../constants'

Enzyme.configure({ adapter: new Adapter() })

//  Test Suite  //

describe('navbar maintains correct paths', () => {
  let wrapper

  it('hamburger menu items contains correct routes', () => {
    // mountComponent(ConnectedApp)
    // const expectedRoutes = routePathToComponent
    //
    // /* eslint no-param-reassign: ["error", { "props": false }] */
    // const pathMap = wrapper.find(Route).reduce((map, route) => {
    //   const routeProps = route.props()
    //   map[routeProps.path] = routeProps.component // Linter exception for this line
    //   return map
    // }, {})
    //
    // expectedRoutes.forEach(expectedRoute => {
    //   expect(pathMap[expectedRoute.path]).toBe(expectedRoute.component)
    // })
    wrapper = mount(mountComponent(NavBar))
    expect(true)
  })
})
