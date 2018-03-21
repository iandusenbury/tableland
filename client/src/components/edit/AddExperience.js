import React from 'react'
import { DatePicker, MenuItem } from 'material-ui'
import PropTypes from 'prop-types'

import { StyledTextField } from '../../widgets/StyledTextField'
import { AddButton } from '../../widgets/AddButton'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { style } from '../../widgets/styles'
import './edit.css'

const AddExperience = props => {
  const { type } = props
  const name = `Name of ${type}`

  return (
    <div className="editOuterDiv">
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
        <StyledTextField text="Address" multiLine />
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

AddExperience.propTypes = {
  type: PropTypes.object.isRequired // eslint-disable-line
}

export default AddExperience
