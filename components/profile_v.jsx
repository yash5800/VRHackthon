'use client'
import React, { useContext, useState } from 'react'
import VCard from './pro_vcard'
import { LogContext } from '@/app/(root)/layout';

const ProfileV = () => {
  const {data} = useContext(LogContext);
  return (
    <div className='flex px-20'>
       <div className='flex flex-wrap justify-start max-lg:gap-5 gap-10'>
         {data.length > 0 ?
           data.map((student, index) => (
             <VCard key={index} title={student.title} teacher={student.subject} url={student.urlid} _created={student._created} />
           ))
           : <h1 className='text-white text-lg mt-3 font-light'>No videos found</h1>
         }
       </div>
    </div>
  )
}

export default ProfileV