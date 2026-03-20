export const playgroundMotion = {
  square: {
    duration: 10,
    rotation: 1080,
    ease: 'elastic.inOut',
  },
  star: {
    duration: 9,
    ease: 'sine.inOut',
    amplitude: 8,
    waves: 4,
  },
}

export function getTravelDistance(trackElement, movingElement) {
  const trackWidth = trackElement.getBoundingClientRect().width
  const movingWidth = movingElement.getBoundingClientRect().width
  return Math.max(trackWidth - movingWidth, 0)
}
