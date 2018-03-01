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

  it('menu paths object fields are not undefined or empty', () => {
    expectedMenuPaths.forEach(menuItem => {
      expect(menuItem.path).not.toBe(undefined)
      expect(menuItem.path).not.toBe('')
      expect(menuItem.value).not.toBe(undefined)
      expect(menuItem.value).not.toBe('')
      expect(menuItem.primaryText).not.toBe(undefined)
      expect(menuItem.primaryText).not.toBe('')
    })
  })

  it('menu paths values are unique', () => {
    const menuItemValues = expectedMenuPaths.map(menuItem => menuItem.value)
    const isDuplicate = menuItemValues.some(
      (item, idx) => menuItemValues.indexOf(item) !== idx
    )
    expect(isDuplicate).toEqual(false)
  })

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
    expect(expectedMenuPaths.length).toEqual(index)
  })
})
