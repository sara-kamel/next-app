import React, { Children, ReactNode } from 'react'

interface Props{
    children : ReactNode;
}

const AdminLayout = ({children} : Props) => {
  return (
    <>
    <div className='flex'>
    <aside className= 'p-5 bg-sky-300 mr-5'>Admin Home</aside>
    <div>{children}</div>
    </div>
    </>
  )
}

export default AdminLayout;