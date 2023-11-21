'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, []);

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user: {name: string}) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </main>
  )
}
