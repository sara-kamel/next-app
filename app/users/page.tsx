import React from 'react'
import UsersTable from './UsersTable'


interface props {
  searchParams: {sortOrder: string}
}
const UsersPage = async ({searchParams: {sortOrder}} : props) => {

  return (
    <>
    <div className='p-5'>
<h1>Users</h1>
<UsersTable sortOrder ={sortOrder}/>
</div>
    </>
  )
}
export default UsersPage
