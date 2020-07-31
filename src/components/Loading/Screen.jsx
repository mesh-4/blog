import React from 'react'
import Typewriter from 'typewriter-effect'

export function LoadingScreen() {
  return (
    <div className="loading-screen__container">
      <Typewriter
        options={{
          strings: ["Welcome to Senlima's blog..."],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  )
}
