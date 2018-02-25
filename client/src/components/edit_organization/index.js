import React, { Component } from 'react'
import './editOrg.css'
import { About } from './About'
import { MediaInfo } from './MediaInfo'

class EditOrg extends Component {
  render() {
    return (
      <div className="OrgPrimaryDiv">
        <div className="OrgHeader">
          <div className="OrgHeaderAvatar" />
        </div>
        <div className="OrgMainGrid">
          <div className="OrgPersonal">
            <About />
          </div>
          <div className="OrgMedia">
            <MediaInfo />
          </div>
        </div>
      </div>
    )
  }
}

export default EditOrg
