'use client';

import React, { useContext, useEffect } from 'react';
import { LogContext } from '../../layout';
import { useRouter } from 'next/navigation';
import ProfileC from '@/components/profile_c';
import ProfileV from '@/components/profile_v';
import Link from 'next/link';

const Page = () => {
  const { type, name, id, data } = useContext(LogContext);
  const router = useRouter();

  useEffect(() => {
    if (!type || !name || !id || !data) {
      router.push('/'); // Navigate after the component has mounted
    }
  }, [type, name, id, data, router]);

  // Show a loading state while the redirection logic runs
  if (!type || !name || !id || !data) {
    return <div>Loading...</div>;
  }


  console.log('Got', type, name, id, data);

  return (
    <section className='px-3 py-14'>
      <ProfileC />
      <div className='bg-slate-700 w-full h-[1px] rounded-full px-3 mt-5 shadow-sm shadow-slate-700'/>
      <ProfileV />
    </section>
  )
};

export default Page;
