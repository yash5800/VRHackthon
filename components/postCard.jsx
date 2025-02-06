'use client'
import { LogContext } from '@/app/(root)/layout'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function validateYouTubeUrl(urlToParse){
  if (urlToParse) {
    var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (urlToParse.match(regExp)) {
        return true;
      }
   }
  return false;
}

const PostCard = () => {
  const {type,setData,data,name,id} = useContext(LogContext)
  const [Sensei,SetSensei] = useState([])
  const router = useRouter()
  const {toast} = useToast()
  const [load,setLoad] = useState(false)

  useEffect(() => {
    if(type !== 'student') router.push('/') 
   const fetchSensei = async () => {
    console.log('Fetching')
     try{
      const res = await fetch('/api/fetch/lookup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        }
      })
        const {found:data} = await res.json()
        SetSensei(data)
     }
     catch (err) {
      console.log(err)
     }
   }
   fetchSensei()

  },[SetSensei])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const url = e.target.url.value
    const tagid = e.target.tagid.value
    const subject = e.target.subject.value

    if (title === '' || url === '' || tagid === 'default' || subject === '') {
      toast({
        title: 'error',
        description:"Fill the fields with valid data",
        variables: "destructive"
      })
      return
    }

    if (!validateYouTubeUrl(url)) {
      toast({
        title: 'error',
        description:"Invalid YouTube Url",
        variables: "destructive"
      })
      return
    }

    setLoad(true)
    const date = new Date().toLocaleDateString('en-US',{
      year:"numeric",
      month:"short",
      day:"numeric",
      hour:"numeric",
      minute:"numeric",
      second:"numeric"
    })

    const VIDEO_ID = url.split("/").pop().split("?")[0]

    const new_data = {
      title:title,
      urlid:VIDEO_ID,
      subject:subject,
      tagid:tagid,
      _created:date,
    }
    setData([...data,new_data])

    try{
      const res = await fetch('/api/maintain/update',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify({
          id:id,
          data: data
        })
      })
        const {found:state} = await res.json()
        if(state){
          setLoad(false);
          toast({
            title:"success",
            description:"Project Posted...",
            variation:"success",
          })
          router.push('/profile/student')
        }
        else{
          setLoad(false);
          toast({
            title:"Faild",
            description:"Project Not Posted 😔",
            variation:"success",
          })
        }
     }
     catch (err) {
      console.log(err)
     }
    
  }
  return (
    <div className='flex flex-col items-center justify-start h-auto w-[350px] py-8 bg-slate-700 rounded-xl '>
      <h1 className='text-2xl font-extralight py-5 text-white'>Project <span className='text-green-400 font-bold'>Posting</span></h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type="text" className='post_input ' name="title" placeholder='Title' />
        <input type="text" className='post_input' name="url" placeholder='YouTube Video Url' />
        <select className='bg-slate-800 text-white rounded-md py-3 hover:outline-dotted outline-green-500' name='tagid'>
           <option value="default" disabled>Tag Your Teacher</option>
           {Sensei.length > 0 ?
              Sensei.map((sensei) => (
                <option key={sensei.id} value={sensei.id}>{`id:${sensei.id} ${sensei.name}`}</option>
              )) : <option value="default" disabled>Loading...</option>
           }
        </select>
        <input type="text" className='post_input' name="subject" placeholder='Subject' />
        <button className='but' type="submit">{load?'Posting..':'Post'}</button>
      </form>
    </div>
  )
}

export default PostCard