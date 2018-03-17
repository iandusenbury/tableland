import React, { Component } from 'react'
import { AppBar, IconButton } from 'material-ui'
import './experience.css'
import { style } from '../../widgets/styles'
import Location from 'material-ui/svg-icons/communication/location-on'
import { StyledPaper } from '../../widgets/StyledPaper'
import ExistingExperiences from '../../containers/existingExperiences'
import { printResults, showResults } from './index'
import NewExperiences from '../../containers/newExperiences'

class Experiences extends Component {
  render() {
    const { submitHandler, saveUpdatedExperiences } = this.props
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
}

export default Experiences
