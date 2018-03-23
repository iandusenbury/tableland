import React, { Component } from 'react'
import { orange400 } from 'material-ui/styles/colors'
import './editOrg.css'
import About from '../../containers/editOrganization/about'
import MediaInfo from '../../containers/editOrganization/mediaInfo'
import { RaisedButton } from 'material-ui'

function clickFunction(submit) {
  submit('about')
  submit('mediaInfo')
  window.location.reload(true)
}

class EditOrg extends Component {
  componentWillMount() {
    const { fetchOrganization, match } = this.props

    fetchOrganization(match.params.id)
  }

  render() {
    const {
      id,
      loading,
      submit,
      updateOrganization,
      updateOrgVideo,
      videoID
    } = this.props

    const saveOrganizationInfo = values => {
      const { name, address, url, description } = values

      if (!address) return

      let addressLine_2, city, state, postalCode, country

      address.addressComponents.forEach(item => {
        item.types.forEach(type => {
          if (type === 'postal_code') {
            postalCode = item.longName
          }
          if (type === 'country') {
            country = item.longName
          }
          if (type === 'locality') {
            city = item.longName
          }
          if (type === 'administrative_area_level_1') {
            state = item.longName
          }
          if (type === 'administrative_area_level_2') {
            addressLine_2 = item.longName
          }
        })
      })

      const updatedInfo = {
        name,
        description,
        url,
        addressLine_1: address.formattedAddress,
        addressLine_2,
        city,
        state,
        postalCode,
        country,
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      }

      updateOrganization(id, updatedInfo)
    }

    const saveOrgVideo = values => {
      const { organizationVideo } = values
      updateOrgVideo(organizationVideo, id, videoID)
    }

    return (
      <div>
        {!loading && (
          <div className="orgPrimaryDiv">
            <div className="orgHeader">
              <div className="orgHeaderAvatar" />
            </div>
            <div className="orgMainGrid">
              <div className="orgPersonal">
                <About onSubmit={saveOrganizationInfo} />
              </div>
              <div className="orgMedia">
                <MediaInfo onSubmit={saveOrgVideo} />
              </div>
            </div>
            <div style={{ margin: '.5%' }}>
              <RaisedButton
                label="Save"
                labelColor="#FFF"
                fullWidth
                buttonStyle={{ backgroundColor: orange400 }}
                onClick={() => clickFunction(submit)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default EditOrg
