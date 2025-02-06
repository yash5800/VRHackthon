'use client'

import React from 'react'

const VideoCard = ({urlid}) => {

  return (
    <div className='flex flex-col gap-3' >
      <iframe
        src={`https://www.youtube.com/embed/${urlid}?modestbranding=1&controls=1&rel=0&autoplay=1`}
        width={330}
        height={200}
        allow="encrypted-media"
        allowFullScreen
        className="mt-20 rounded-2xl shadow-sm shadow-white"
        title="YouTube Video"
      />
    </div>
  )
}

export default VideoCard
