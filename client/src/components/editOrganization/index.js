import React, { Component } from 'react'
import { find, propEq } from 'ramda'
import { orange400 } from 'material-ui/styles/colors'
import { RaisedButton, Paper } from 'material-ui'
import PropTypes from 'prop-types'

import About from '../../containers/editOrganization/about'
import NotFound from '../notFound'
import MediaInfo from '../../containers/editOrganization/mediaInfo'
import './editOrg.css'

function clickFunction(submit, placesClearAll) {
  submit('about')
  submit('mediaInfo')
  placesClearAll()
  window.location.reload(true)
}

class EditOrg extends Component {
  componentWillMount() {
    const {
      fetchOrganization,
      fetchUserPermissions,
      match,
      userId
    } = this.props

    fetchOrganization(match.params.id)
    fetchUserPermissions(userId)
  }

  componentWillUnmount() {
    const { placesClearAll } = this.props
    placesClearAll()
  }

  render() {
    const {
      id,
      submit,
      updateOrganization,
      updateOrgVideo,
      videoID,
      placesResult,
      permissions,
      placesClearAll
    } = this.props

    const orgIds = permissions.map(perm => {
      const { id: permId } = perm

      return permId
    })

    const found = find(propEq('id', id))(permissions)

    const permissionDenied = found === undefined && orgIds.length > 0

    const saveOrganizationInfo = values => {
      const { name, address, url, description } = values

      if (!address) return

      let addressLine_2, city, state, postalCode, country

      placesResult.addressComponents.forEach(item => {
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
        addressLine_1: placesResult.formattedAddress,
        addressLine_2,
        city,
        state,
        postalCode,
        country,
        lat: placesResult.geometry.location.lat(),
        lng: placesResult.geometry.location.lng()
      }

      updateOrganization(id, updatedInfo)
    }

    const saveOrgVideo = values => {
      const { organizationVideo } = values
      updateOrgVideo(organizationVideo, id, videoID)
    }

    const toRender = () => {
      if (permissionDenied) {
        return <NotFound />
      }

      return (
        <div className="orgPrimaryDiv">
          <div className="orgHeader">
            <div className="orgHeaderAvatar" />
          </div>
          <Paper className="orgMainGrid">
            <div className="orgPersonal">
              <About onSubmit={saveOrganizationInfo} />
            </div>
            <div className="orgMedia">
              <MediaInfo onSubmit={saveOrgVideo} />
            </div>
          </Paper>
          <Paper className='edit-org-save-button-wrapper' >
            <div className='edit-org-save-button' >
              <RaisedButton
                label="Save"
                labelColor="#FFF"
                fullWidth
                buttonStyle={{ backgroundColor: orange400 }}
                onClick={() => clickFunction(submit, placesClearAll)}
              />
            </div>
          </Paper>
        </div>
      )
    }

    return toRender()
  }
}

EditOrg.propTypes = {
  fetchOrganization: PropTypes.func.isRequired,
  fetchUserPermissions: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  submit: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  updateOrgVideo: PropTypes.func.isRequired,
  videoID: PropTypes.number.isRequired,
  placesResult: PropTypes.object.isRequired, // eslint-disable-line
  permissions: PropTypes.array.isRequired, // eslint-disable-line
  placesClearAll: PropTypes.func.isRequired
}

export default EditOrg
