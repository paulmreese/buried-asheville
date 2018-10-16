import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
}  from 'react-google-maps';
import escapeRegExp from 'escape-string-regexp'

const mapStyles = require("../Styles/mapStyles.json")

let showingMarkers

const defaultIcon = {
  url : "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FF4500|40|_|%E2%80%A2",
  scaledSize : {width: 26, height: 44}
}

const MyMapComponent = withScriptjs(

  withGoogleMap(props => (

    <GoogleMap
      defaultZoom = {16}
      defaultCenter = {{lat: 35.596421, lng: -82.553308}}
      defaultOptions = {{styles : mapStyles,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        fullscreenControl: false}}

    >

      {props.isMarkerShown && showingMarkers.map((marker) => (
        <Marker
          position={marker.location}
          defaultIcon={ defaultIcon }
          key={marker.title}
          isOpen={marker.isOpen}
          isVisible="true"
          onClick={() => props.handleMarkerClick(marker)}
        >
          {marker.isOpen &&
            <InfoWindow>
              <div className="infowindow">
                <h3>{marker.title}</h3>
                {!props.hideFoursquare ?
                  (<div style={{width: '90%', position: 'relative', margin: '0 auto'}}>
                    <img src={marker.imageLink}
                      alt={marker.title}
                      className="foursquare-image"
                    />
                    <p className="image-credit">
                      Photo by: {marker.imageCredit}
                    </p>
                    <img
                      src="./Foursquare.png"
                      alt="Foursquare"
                      className="foursquare-logo"/>
                  </div>)
                  :
                  (<div
                    className="foursquare-failed"
                    >
                    FourSquare API failed to load
                  </div>)
                }
                <button
                  onClick={() => props.handleRedditToggle(marker)}
                >
                  <span>{!marker.showReddit ? "Show Reddit Comment" :
                    "Hide Reddit Comment"}</span>
                  <span className="warning">(May contain offensive material)</span>
                </button>
                {marker.showReddit &&
                  <div className="reddit-comment">
                    <a
                      className="embedly-card"
                      href={marker.redditLink}
                    >
                      Card
                    </a>
                  </div>
                }
              </div>
            </InfoWindow>}
        </Marker>
      ))}
    </GoogleMap>
  ))
);


export default class Map extends Component {

  render() {
    const { markers, filterQuery } = this.props

    if (filterQuery) {
      const match = new RegExp(escapeRegExp(filterQuery), 'i')
      showingMarkers = markers.filter((marker) => match.test(marker.title))
    } else {
      showingMarkers = markers
    }

    return (
      // Important! Always set the container height explicitly

        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&v=3&key=AIzaSyAQT1oEx7KEpFrznIBud7wG2V3b4GkJrc8"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`}} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers = {this.props.markers}
          handleMarkerClick = {this.props.handleMarkerClick}
          handleRedditToggle = {this.props.handleRedditToggle}
          hideFoursquare = {this.props.hideFoursquare}
        />

    );
  }
}
