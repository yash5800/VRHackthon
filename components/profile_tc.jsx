'use client'
import { LogContext } from '@/app/(root)/layout';
import Image from 'next/image'
import React, { useContext } from 'react'

const ProfileTC = () => {
  const {name} = useContext(LogContext);

  return (
    <div className='flex justify-start items-center'>
      <div className='w-auto h-auto flex flex-row justify-center items-center gap-5 max-sm:ml-8 ml-16'>
       <Image 
        src='/images/teacher.webp' 
        alt='Student Profile' 
        className='rounded-full border-2 border-slate-600'
        width={180}
        height={180}
         />
        <div className='flex flex-col justify-center items-start gap-2'>
           <h1 className='text-gray-400 text-2xl font-bold'>{name}<span className='text-green-500 text-4xl'>.</span></h1>
        </div>
      </div>
    </div>
  )
}

export default ProfileTC
