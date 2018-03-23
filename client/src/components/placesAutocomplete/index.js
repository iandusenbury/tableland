import React, { Component } from 'react'
import { AutoComplete, MenuItem } from 'material-ui'
import Marker from 'material-ui/svg-icons/maps/place'
import PropTypes from 'prop-types'
import { camelizeKeys } from 'humps'
import { isEmpty } from 'ramda'

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props)

    const { google } = window
    this.geocoder = new google.maps.Geocoder()
    this.service = new google.maps.places.AutocompleteService(null)

    this.updateInput = this.updateInput.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
  }

  componentWillMount() {
    const {
      placesUpdateData,
      resultsCallback,
      placesData,
      searchTexts,
      placesUpdateText,
      value,
      formIndex
    } = this.props
    if (value) {
      this.updateInput(value, formIndex)
    } else placesUpdateData([], formIndex)
  }

  getLatLng(placeId, callback) {
    this.geocoder.geocode({ placeId }, (results, status, searchText) => {
      callback(results, status, searchText)
    })
  }

  updateInput(searchText) {
    const { placesUpdateData, placesUpdateText, formIndex } = this.props
    const { service } = this
    placesUpdateText(searchText, formIndex)
    if (searchText.length > 0) {
      service.getPlacePredictions(
        {
          input: searchText
        },
        predictions => {
          if (predictions) {
            placesUpdateData(predictions, formIndex)
          }
        }
      )
    }
  }

  render() {
    const {
      placesData,
      resultsCallback,
      required,
      errorStyle,
      errorText,
      searchTexts,
      formIndex,
      value,
      placesResults,
      placesUpdateResult
    } = this.props

    if (value && placesData[0].length > 0 && isEmpty(placesResults)) {
      const item = placesData[0]
      this.geocoder.geocode({ placeId: item[0].place_id }, results => {
        placesUpdateResult(camelizeKeys(results[0]), 0)
      })
    }

    return placesData[formIndex] ? (
      <div>
        <AutoComplete
          searchText={searchTexts[formIndex]}
          errorText={errorText}
          errorStyle={errorStyle}
          onUpdateInput={this.updateInput}
          onChange={this.updateInput}
          fullWidth
          hintText="Address"
          onNewRequest={(request, index) => {
            let item = placesData[formIndex][index]
            if (!item) {
              item = placesData[formIndex][0] // eslint-disable-line
            }
            this.getLatLng(item.place_id, (results, status) => {
              resultsCallback(
                camelizeKeys(results[0]),
                status,
                searchTexts[formIndex]
              )
            })
          }}
          dataSource={placesData[formIndex].map((item, i, array) => {
            if (i === array.length - 1) {
              return {
                text: item.description,
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
    ) : null
  }
}

GooglePlaceAutocomplete.propTypes = {
  placesData: PropTypes.array.isRequired, // eslint-disable-line
  placesUpdateData: PropTypes.func.isRequired,
  resultsCallback: PropTypes.func, // eslint-disable-line
  fullWidth: PropTypes.bool // eslint-disable-line
}

export default GooglePlaceAutocomplete
