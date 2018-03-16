import React, { Component } from 'react'
import { AutoComplete, MenuItem } from 'material-ui'
import Marker from 'material-ui/svg-icons/maps/place'
import PropTypes from 'prop-types'

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props)

    const { google } = window
    this.geocoder = new google.maps.Geocoder()
    this.service = new google.maps.places.AutocompleteService(null)

    this.updateInput = this.updateInput.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
  }

  getLatLng(placeId, callback) {
    this.geocoder.geocode({ placeId }, (results, status) => {
      callback(results, status)
    })
  }

  updateInput(text) {
    const { placesUpdateSearchText, placesUpdateData } = this.props
    const { service } = this
    if (text.length > 0) {
      placesUpdateSearchText(text)
      service.getPlacePredictions(
        {
          input: text
        },
        predictions => {
          if (predictions) {
            placesUpdateData(predictions)
          }
        }
      )
    }
  }

  render() {
    const { data, searchText, results: resultsCallback } = this.props
    return (
      <div>
        <AutoComplete
          searchText={searchText}
          onUpdateInput={this.updateInput}
          onChange={this.updateInput}
          onNewRequest={(request, index) => {
            let item = data[index]
            if (!item) {
              item = data[0] // eslint-disable-line
            }
            this.getLatLng(item.place_id, results => {
              resultsCallback(results)
            })
          }}
          dataSource={data.map((item, i, array) => {
            if (i === array.length - 1) {
              return {
                text: '',
                value: (
                  <MenuItem style={{ cursor: 'default' }} disabled>
                    <div style={{ paddingTop: '20' }}>
                      <img
                        style={{ float: 'right' }}
                        width={96}
                        height={12}
                        src="https://developers.google.com/places/documentation/images/powered-by-google-on-white.png"
                        alt="presentation"
                      />
                    </div>
                  </MenuItem>
                )
              }
            }
            return {
              text: item.description,
              value: (
                <MenuItem
                  style={{
                    fontSize: 13,
                    display: 'block',
                    paddingRight: 20,
                    overflow: 'hidden'
                  }}
                  innerDivStyle={{
                    paddingRight: 38,
                    paddingLeft: 38
                  }}
                  // Used by Google Places / No user input
                  primaryText={item.description}
                  leftIcon={<Marker style={{ width: '20px' }} />}
                />
              )
            }
          })}
        />
      </div>
    )
  }
}

GooglePlaceAutocomplete.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  searchText: PropTypes.string.isRequired,
  placesUpdateSearchText: PropTypes.func.isRequired,
  placesUpdateData: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired // eslint-disable-line
}

export default GooglePlaceAutocomplete
