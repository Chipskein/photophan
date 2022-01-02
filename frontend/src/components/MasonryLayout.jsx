import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'
function MasonryLayout({pins}) {
    const breakpointObj={
        default:4,
        3000:6,
        2000:5,
        1200:4,
        1000:2,
        500:1
    }
    return (
        <div>
            <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
              {pins.map((pin)=> <Pin key={pin._id} pin={pin} />)}  
            </Masonry>
        </div>
    )
}

export default MasonryLayout
