import React from 'react'

export default class MapErrorMessage extends React.Component {
  render() {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#ccc',
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box'
        }}>
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            fontSize: '2.5em',
            backgroundColor: '#fff'
          }}>
          <div><p>
            Failed to load Google Maps
          </p></div>
        </div>
      </div>
    )
  }
}
