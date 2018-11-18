import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Sidebar extends Component {
  state = {
    isOpen : true
  }

  render() {
    const { filterQuery, updateQuery, markers,
      handleMarkerClick } = this.props

    let showingMarkers
    if (filterQuery) {
      const match = new RegExp(escapeRegExp(filterQuery), 'i')
      showingMarkers = markers.filter((marker) => match.test(marker.title))
    } else {
      showingMarkers = markers
    }

    return (
      <div
        style={this.props.showSidebar ? {left: '0'} : {left: '-245px'}}
        className="sidebar"
      >
        <button
          onClick={() => this.props.handleSidebarToggle()}
          className="sidebar-toggle"
        >

        </button>
        <h2>
          Buried <br/>
          Asheville
        </h2>
        <hr/>
        <input
          type="text"
          role="search"
          className="filter-input"
          placeholder="Filter locations by name..."
          value={filterQuery}
          onChange={(event) => updateQuery(event.target.value)}
          />
        <hr/>
        {showingMarkers.length !== markers.length && (
          <div className="showing-contacts">
            <span>
              Showing {showingMarkers.length} of {markers.length}
              <button onClick={this.props.clearQuery}>(Show all)</button>
            </span>
          </div>
        )}
        <ul>
          {showingMarkers.map((marker) => (
            <li key={marker.title}>
              <button
                onClick={() => handleMarkerClick(marker)}
                style={{
                  padding: '0',
                  margin: '0',
                }}
              >
                {marker.title}</button>
            </li>
          ))}
        </ul>
        <a href="https://www.citizen-times.com/story/entertainment/2015/10/28/underground-asheville/74236848/">
          <div className="times-link">

            <span>Read more:</span>

            <img
              src="./Asheville-Citizen-Times-logo.png"
              alt="Article from Asheville Citizen-Times media group, part of the USA Today Network"
            />

          </div>
        </a>
      </div>
    )
  }
}

export default Sidebar
