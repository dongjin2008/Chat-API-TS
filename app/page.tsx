'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'


export default function Home() {
  const cookie_username = cookies().get('username');
  const [username, setUsername] = useState(cookie_username || '');
  const router = useRouter();

  const handleSubmit = async (username: string) => {
    try {
      const response = await axios.post('/api/users', { username });
      console.log(response);
      cookies().set('userId', response.data.id)
      cookies().set('username', response.data.username)
      router.push('/chat')
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-[2.5rem]'>
        <input className='w-[40.5rem] h-[7.5rem] rounded-[6.25rem] placeholder:text-[#A5A5A5] text-[39px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] pl-[4rem] ' type="text" placeholder='Enter the username' value={username} onChange={(e) => {setUsername(e.target.value)}} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(username);
            setUsername('');
          }
        }}/>
        <button className='w-[26.5rem] h-[7.5rem] rounded-[6.25rem] text-[49px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]' onClick={() => {
          handleSubmit(username)
          setUsername('');
        }}>
          Join
        </button>
      </div>
    </main>
  )
}

