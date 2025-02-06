import React from 'react'
import VideoCard from './video_card'
import Image from 'next/image'

const VCard = ({title,teacher,url,_created}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2 max-sm:px-10 h-[280px]'>
      <VideoCard url={url} />
      <div className='flex flex-row w-full gap-3 '>
       <Image src="/images/teacher.webp" className="rounded-full" alt='video' width={60} height={60} />
       <div className='flex flex-col w-full'>
        <h1 className='text-white text-lg'>{title}</h1>
        <div className='flex flex-row w-full justify-between'>         
          <h1 className='text-gray-400 text-base'>{teacher}</h1>
          <h1 className='text-white text-sm '>{_created}</h1>
        </div>
       </div>
      </div>
    </div>
  )
}

export default VCard