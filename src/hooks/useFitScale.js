import { useEffect, useState } from 'react'

/**
 * Scale (max 1) that lets a fixed-height block fit inside the viewport without scrolling.
 * Reason: the lead form lives in an iframe whose height cannot be changed, so on short screens we scale it down.
 * @param {number} naturalHeight Height of the block at scale 1, in px.
 * @param {number} reserve Vertical space to keep free around the block, in px.
 * @param {number} minScale Lowest allowed scale.
 * @returns {number} Scale between minScale and 1; always 1 on narrow screens where the layout stacks.
 */
function useFitScale(naturalHeight, reserve, minScale = 0.6) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 960) return setScale(1)
      setScale(Math.max(minScale, Math.min(1, (window.innerHeight - reserve) / naturalHeight)))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [naturalHeight, reserve, minScale])

  return scale
}

export default useFitScale
