'use client';

import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import React, { createContext, useState } from 'react';

export const LogContext = createContext({
  type: '',
  name: '',
  id: '',
  data: [],
  setType: () => {},
  setName: () => {},
  setId: () => {},
  setData: () => {},
});

const Layout = ({ children }) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('')
  const [data, setData] = useState([]);

  return (
    <LogContext.Provider value={{ type, name, id, data, setType, setName,setId, setData }}>
      <div className='py-4 w-full bg-gray-700 flex flex-row justify-between px-3'>
        <h1 className='text-xl text-white font-bold'>Welcome to the Student Projects</h1>
        <div className='flex flex-row gap-5'>
        {
          type === 'student' &&
          <Link href={'/create'} >
        <h1 className='font-medium text-lg text-white'>Create</h1>
        </Link>}
        {
          name !== '' &&
          <Link href={'/'} >
        <h1 className='font-medium text-lg text-white'>Home</h1>
        </Link>}
        </div>
      </div>
      {children}
      <Toaster />
    </LogContext.Provider>
  );
};

export default Layout;
