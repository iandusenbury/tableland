import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import PropTypes from 'prop-types'
import Location from 'material-ui/svg-icons/communication/location-on'
import './experience.css'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import ExistingExperiences from '../../containers/existingExperiences'
import NewExperiences from '../../containers/newExperiences'

const Experiences = props => {
  const { submitHandler, saveUpdatedExperiences } = props
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
          <ExistingExperiences onSubmit={saveUpdatedExperiences} />
          <NewExperiences onSubmit={submitHandler} />
        </div>
      </div>
    </StyledPaper>
  )
}

Experiences.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  saveUpdatedExperiences: PropTypes.func.isRequired
}

export default Experiences
