import React from 'react'

export function LoadingScreen() {
  return (
    <div
      style={{
        display: 'flex',
        weight: '100vw',
        height: '100vh',
        placeItems: 'center',
        backgroundColor: '#272727',
      }}
    >
      <p
        style={{
          margin: 0,
          width: '100%',
          textAlign: 'center',
          color: '#f8f8f8',
        }}
      >
        loading...
      </p>
    </div>
  )
}
