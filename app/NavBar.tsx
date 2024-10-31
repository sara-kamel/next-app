'use client'
import Link from 'next/link'
import React from 'react'
import {  useSession } from 'next-auth/react'
const NavBar = () => {
  const { status, data: session } = useSession()

  return (
    <div className='flex  bg-sky-300 p-5'>
      <Link className='mr-5 ' href='/'>
        Home
      </Link>
      <Link className='mr-5' href='/users'>
        Users
      </Link>
      {status === 'authenticated' ? (
        <div>
          {session.user?.name}
          <Link className='ml-5' href='/api/auth/signout'>
            Sign Out
          </Link>
          <Link className='ml-5' href='/change-password'>
            Change password
          </Link>
        </div>
      ) : (
        <>
          <Link href='/api/auth/signin'>Login</Link>
          <Link className='ml-5' href='/sign-up'>
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}

export default NavBar
