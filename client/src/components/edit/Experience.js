import React from 'react'
import { StyledTextField } from '../../widgets/StyledTextField'
import { DatePicker, Paper, AppBar, IconButton, MenuItem } from 'material-ui'
import './experience.css'
import { style } from '../../widgets/styles'
import { AddButton } from '../../widgets/AddButton'
import Location from 'material-ui/svg-icons/communication/location-on'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledSelectField } from '../../widgets/StyledSelectField'

export const Experience = props => {
  const { type } = props
  const name = `Name of ${type}`
  return (
    <StyledPaper>
      <div className="EditBoxGrid">
        <div className="EditLeft">
          <AppBar
            iconElementLeft={
              <IconButton>
                <Location />
              </IconButton>
            }
            title={<span style={style.title}>Experiences</span>}
            iconStyleLeft={style.appBar}
          />
        </div>
        <div className="EditRight">
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
        </div>
      </div>
    </StyledPaper>
  )
}
