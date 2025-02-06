'use client'

import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { LogContext } from '../../layout'

const page = () => {
  const router = useRouter();
  const [load,setLoad] = useState(false);
  const {toast} = useToast();
  const {setData,setType,setName,setId} = useContext(LogContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.elements['id'].value;
    const pwd = e.target.elements['pwd'].value;

    if(!id || !pwd){
      alert('Please fill all fields');
      return;
    }
    setLoad(true);

    try{
      const res = await fetch('/api/login/checkStudent',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify({ id, pwd }),
      })
      const data = await res.json();
      setLoad(false);

      if(data.found.length > 0){
        setType('student');
        setName(data.found[0].name);
        setId(data.found[0].id);
        setData(data.found[0].data);
        router.push('../../profile/student');
      }
      else{
        toast({
          title:"error",
          description:"Invalid Login Data ",
          variation:"destructive"
        })
      }
    }
    catch(err){
      setLoad(false);
      console.log(err);
    }
  }


  return (
    <div className='absolute h-full w-full flex flex-col justify-center items-center'>
      <div className='card'>
         <h1 className='text-2xl font-medium text-white '><span className='text-green-400 font-normal'>Student</span> Login.</h1>         
          <div className='px-8'>
            <form onSubmit={handleSubmit}>
               <input type='text' name='id' placeholder='ID' className='login_input'/>
               <input name='pwd' type='password' placeholder='Password' className='login_pwd'/>
               <button className='but'>Login</button>
            </form>
          </div>
         <div className='flex flex-col justify-center items-center'>
           <h1 className='font-mono text-md text-white'>SignIn as <Link href={'/login/teacher'} ><span className='text-green-400 font-normal'>Teacher</span></Link> </h1>
           <h1 className='text-base font-thin text-blue-400'>or</h1>
           <h1 className='text-white text-md font-mono'>SignUp <Link href={'/register/student'} ><span className='text-blue-400 font-normal'>Student</span></Link></h1>
         </div>
      </div>
    </div>
  )
}

export default page
