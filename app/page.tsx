'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: number;
  username: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = async (username: string) => {
    try {
      const response = await axios.post('/api/users', { username });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div>
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e.currentTarget.value);
            setUsername('');
          }
        }}/>
      </div>
    </main>
  )
}
