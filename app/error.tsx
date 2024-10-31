'use client'
import React from 'react'

interface Props {
  error: Error
  reset: () => void
}
const Error = ({ error, reset }: Props) => {
  console.log('Error', error)
  return (
    <>
      <div>an unexpected error has accurred!</div>
      <button className='btn' onClick={() => reset()}>
        {' '}
        Retry
      </button>
    </>
  )
}

export default Error
