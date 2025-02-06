'use client'

import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {

  const [load,setLoad] = useState
  (false);
  const router = useRouter();
  const {toast} = useToast();
  const [error,setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ID = e.target.elements['ID'].value;
    const user = e.target.elements['user'].value;
    const email = e.target.elements['email'].value;
    const pwd = e.target.elements['pwd'].value;

    if(!user || !pwd || !email || !ID){
      alert('Please fill all fields');
      return;
    }
    setLoad(true);

    try{
      const res = await fetch('/api/register/registerSensei',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify({ ID,user,email, pwd }),
      })
      const data = await res.json();
      setLoad(false);
      console.log(data);

      if(data.found.insert){
        toast({
          title:"success",
          description:"Registered successfully",
          variation:"success",
        })
        router.push('../login/teacher');
      }
      else if(data.found.exists){
        setError(true);
      }
      else{
        toast({
          title:"error",
          description:"Invalid Register Data ",
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
      <div className='card '>
         <h1 className='text-2xl font-medium text-green-400 '><span className='text-white font-normal'>Teacher</span> Register.</h1>
         <div className='px-8'>
         <form onSubmit={handleSubmit}>
            <input type='text' placeholder='ID' 
            name="ID" className='login_input'/>
            {error&&<h1 className='text-md text-red-600 font-medium'>ID Exists</h1>}
            <input type='text' name="user" placeholder='Username' className='login_input'/>
            <input name="email" type='email' placeholder='Email' className='login_input'/>
            <input type='password' name="pwd" placeholder='Password' className='login_pwd'/>
            <button className='but'>{load?'Sending...':'Register'}</button>
          </form>
         </div>
         <div className='flex flex-col justify-center items-center'>
           <h1 className='font-mono text-md text-white'>SignIn as <Link href={'/login/teacher'} ><span className='text-green-400 font-normal'>Teacher</span></Link> </h1>
         </div>
      </div>
    </div>
  )
}

export default page
