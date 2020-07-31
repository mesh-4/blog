import React from 'react'
import Typewriter from 'typewriter-effect'

export function ArticleSkeleton() {
  return (
    <div style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
      <Typewriter
        options={{
          strings: ['Article loading...'],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  )
}
