import React, { Component } from 'react'
import { DatePicker, MenuItem } from 'material-ui'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Field, reduxForm } from 'redux-form'

import { StyledTextField } from '../../widgets/StyledTextField'
import { AddButton } from '../../widgets/AddButton'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { style } from '../../widgets/styles'
import './edit.css'

class AddExperience extends Component {
// export const AddExperience = props => {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({address})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const { type } = this.props
    const name = `Name of ${type}`

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Search Address...'
    }

    return (
      <div className="EditOuterDiv">
        <div>
          <StyledTextField text={name} />
        </div>
        <div>
          <StyledTextField text="Position/Role" />
        </div>
        <div>
          <StyledSelectField text="Current Position?">
            <MenuItem primaryText="No" />
            <MenuItem primaryText="Yes" />
          </StyledSelectField>
        </div>
        <div>
          <StyledTextField text="Awards Received" multiLine />
        </div>
        <div>
          <DatePicker
            style={style.datePicker}
            hintText="Start Date"
            mode="landscape"
          />
        </div>
        <div>
          <DatePicker
            style={style.datePicker}
            hintText="End Date"
            mode="landscape"
          />
        </div>
        <div>
          <PlacesAutocomplete inputProps={inputProps} />
        </div>
        <div>
          <StyledTextField text="City" disabled />
        </div>
        <div>
          <StyledTextField text="State" disabled />
        </div>
        <div>
          <StyledTextField text="Postal Code" disabled />
        </div>
        <div>
          <StyledTextField text="Country" disabled />
        </div>
        <div />
        <div>
          <AddButton label="Add Program" disabled />
        </div>
        <div>
          <AddButton label="Add Experience" />
        </div>
      </div>
    )
  }
}



export default AddExperience
