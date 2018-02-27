import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavBar from '../../containers/navbar'
import { mountComponent } from '../constants'
import { mesaMenuButton, navbarMenuPaths } from '../../constants/navbar'

Enzyme.configure({ adapter: new Adapter() })

//  Test Suite  //

describe('navbar maintains correct paths', () => {
  const wrapper = mount(mountComponent(NavBar))
  const expectedMESAButton = mesaMenuButton
  const expectedMenuPaths = navbarMenuPaths

  it('mesa menu button links to home page', () => {
    const menuButton = wrapper.find('FlatButton').props()
    const menuButtonPath = menuButton.containerElement.props.to

    expect(menuButton.label).toEqual(expectedMESAButton.label)
    expect(menuButtonPath).toEqual(expectedMESAButton.path)
  })

  it('hamburger menu items contains correct routes', () => {
    const iconMenuChildren = wrapper.find('IconMenu').props().children
    let index = 0

    iconMenuChildren.forEach(child => {
      if (child.type.muiName === 'MenuItem' && child.props.containerElement) {
        const menuItemLinkPath = child.props.containerElement.props.to
        const menuItemValue = child.props.value
        const menuItemPrimaryText = child.props.primaryText

        expect(menuItemLinkPath).toEqual(expectedMenuPaths[index].path)
        expect(menuItemValue).toEqual(expectedMenuPaths[index].value)
        expect(menuItemPrimaryText).toEqual(
          expectedMenuPaths[index].primaryText
        )
        index += 1
      }
    })
  })
})
