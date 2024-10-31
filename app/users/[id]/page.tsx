import { notFound } from 'next/navigation'
import React from 'react'

interface props {
  params: { id: number}
}

const usersDetaild = ({ params: { id } }: props) => {
if(id > 10) notFound();

  return <div>{id}</div>
}

export default usersDetaild
