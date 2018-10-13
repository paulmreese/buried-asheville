import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary'
import Map from './Components/Container';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer'
import SquareAPI from './API/';


class App extends Component {
  state = {
    markers : [
      {title: 'Vance Monument',
        location :{lat: 35.595093, lng: -82.551458},
        redditLink : 'https://www.reddit.com/r/asheville/comments/1o2y1a/' +
          'underground_asheville_literally/ccocljz/',
        isOpen : false},
      {title: 'Masonic Temple',
        location :{lat: 35.598138, lng: -82.552338},
        redditLink : 'https://www.reddit.com/r/asheville/comments/1o2y1a/' +
          'underground_asheville_literally/ccocuo1/',
        isOpen : false},
      {title: 'Rat Alley',
        location :{lat: 35.594525, lng: -82.556230},
        redditLink : 'https://www.reddit.com/r/asheville/comments/1o2y1a/' +
          'underground_asheville_literally/ccod0ar/',
        isOpen : false},
      {title: 'Pack\'s Tavern',
        location :{lat: 35.595163, lng: -82.549720},
        redditLink : 'https://www.reddit.com/r/asheville/comments/1xg4z3/' +
          'asheville_subway_system_locations/cfbsttx/',
        isOpen : false},
      {title: 'Basilica of St. Lawrence ',
        location :{lat: 35.597405, lng: -82.556318},
        redditLink : 'https://www.reddit.com/r/asheville/comments/1o2y1a/' +
          'underground_asheville_literally/ccp4djt/',
        isOpen : false}
    ],
    showSidebar : false,
    filterQuery : '',
    hideFoursquare : false
  }

  initializePhotos = () => {
    const markers = this.state.markers.map((marker) => {
      SquareAPI.search({
        near : `${marker.location.lat},${marker.location.lng}`,
        intent : 'checkin',
        limit : '1'
      }).then(
        App.handleErrors
      ).then(checkinResults => SquareAPI.getVenuePhotos(
        checkinResults.response.venues[0].id
      ).then(
        photoResults => {
          const prefix = photoResults.response.photos.items[0].prefix
          const size = '500x500'
          const suffix = photoResults.response.photos.items[0].suffix
          marker.imageLink = `${prefix}${size}${suffix}`

          marker.imageCredit = ``
          const firstName = photoResults.response.photos.items[0].user.firstName
          marker.imageCredit = `${firstName} `
          if (photoResults.response.photos.items[0].user.lastName) {
            const lastName = photoResults.response.photos.items[0].user.lastName
            marker.imageCredit += `${lastName}`
          }
        }
      ).catch(
        error => console.log(error) &&
        this.setState({hideFoursquare : true})
      )).catch(
        this.setState({hideFoursquare : true})
      )
      return marker
    })
    this.setState({markers : Object.assign(
      this.state.markers, markers
    )})
  }

  closeOpenInfoWindows = () => {
    const markers = this.state.markers.map((marker) => {
        marker.isOpen = false
        return marker
    })
    this.setState({markers : Object.assign(
      this.state.markers, markers
    )})
  }

  updateFilterQuery = (query) => {
    this.setState({ filterQuery: query.trim() })
  }

  clearQuery = (query) => {
    this.setState({ filterQuery: '' })
  }

  /* Credit for generic error handling function
  https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  */
  handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  handleMarkerClick = (marker) => {
    this.closeOpenInfoWindows()
    marker.isOpen = true
    this.setState({ markers : Object.assign(
      this.state.markers, marker
    )})
  }


  handleRedditToggle = (marker) => {
    !marker.showReddit ? marker.showReddit = true : marker.showReddit = false
    this.setState({ markers : Object.assign(
      this.state.markers, marker
    )})
  }

  handleSidebarToggle = () => {
    !this.state.showSidebar ?
      this.setState({showSidebar : true}) :
      this.setState({showSidebar : false})
  }

  componentWillMount() {
    this.initializePhotos()
  }

  render() {

    return (
      <ErrorBoundary>
        <div className="App">
          <Map
            markers = {this.state.markers}
            handleMarkerClick = {this.handleMarkerClick}
            handleRedditToggle = {this.handleRedditToggle}
            filterQuery = {this.state.filterQuery}
            hideFoursquare = {this.state.hideFoursquare}
          />
          <Sidebar
            markers = {this.state.markers}
            filterQuery = {this.state.filterQuery}
            clearQuery = {this.clearQuery}
            updateQuery = {this.updateFilterQuery}
            handleMarkerClick = {this.handleMarkerClick}
            handleSidebarToggle = {this.handleSidebarToggle}
            showSidebar = {this.state.showSidebar}
          />
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
