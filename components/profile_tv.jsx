'use client'
import React, { useContext, useEffect, useState } from 'react'
import VCard from './pro_vcard'
import { LogContext } from '@/app/(root)/layout';

const ProfileTV = () => {
  const { id ,setData } = useContext(LogContext);
  
  const [taged_stu,setStu] = useState([]);
  const [load,setLoad] = useState(false);

  useEffect(()=>{
     const fetch_data = async ()=>{
      setLoad(true)
      try{
        const res = await fetch('/api/fetch/student_lookup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
          }
        })
        const data = await res.json();
        setStu(data.found);
        setLoad(false);
        setData(taged_stu);
        console.log(taged_stu)
      }
      catch(err){
        setLoad(false);
        console.log(err);
        toast({
          title:"error",
          description:"FAILED to fetch data",
          variation:"destructive"
        })
      }
     }
     fetch_data();
  },[setStu,setLoad])
  

  return (
    <div className='flex px-20'>
       <div className='flex flex-wrap justify-start max-lg:gap-5 gap-10'>
         {taged_stu.length > 0 ?
           taged_stu.map((students) => (
             students.data.map((student,index)=>(
              id == student.
              tagid && <VCard key={index} title={student.title} teacher={student.subject} url={student.urlid} _created={student._created} />
             ))
           ))
           : load ? <h1 className='text-white text-lg mt-3 font-light'>Loading</h1> :<h1 className='text-white text-lg mt-3 font-light'>No videos taged you</h1>
         }
       </div>
    </div>
  )
}

export default ProfileTV