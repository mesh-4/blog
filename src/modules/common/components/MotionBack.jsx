import React from 'react'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 2}px,${y / 3}px,0)`

export function MotionBack() {
  const [aniVal, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 450, friction: 80 },
  }))
  return (
    <div
      className="absolute top-0 left-0 w-full h-screen"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <animated.div
        class="absolute w-32 h-64 bg-white rounded-full mix-blend-difference"
        style={{
          top: '28vh',
          left: '7.5vw',
          transform: aniVal.xy.interpolate(trans1),
        }}
      />
      <animated.div
        className="absolute w-24 h-24 bg-pink-300 rounded-full mix-blend-difference"
        style={{
          top: '30.5vh',
          left: '15vw',
          transform: aniVal.xy.interpolate(trans2),
        }}
      />
    </div>
  )
}
