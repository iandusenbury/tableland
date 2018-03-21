import React, { Component } from 'react'
import './editOrg.css'
import { About } from './About'
import { MediaInfo } from './MediaInfo'

class EditOrg extends Component {
  render() {
    return (
      <div className="orgPrimaryDiv">
        <div className="orgHeader">
          <div className="orgHeaderAvatar" />
        </div>
        <div className="orgMainGrid">
          <div className="orgPersonal">
            <About />
          </div>
          <div className="orgMedia">
            <MediaInfo />
          </div>
        </div>
      </div>
    )
  }
}

export default EditOrg
