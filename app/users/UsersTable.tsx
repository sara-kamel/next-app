import Link from 'next/link'
import React from 'react'
import { sort } from 'fast-sort'

interface User {
  id: number
  name: string
  email: string
}
interface Props {
  sortOrder: string
}
const UsersTable = async ({ sortOrder }: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: User[] = await res.json()

  const sortUsers = sort(users).asc(
    sortOrder === 'email' ? user => user.email : user => user.name
  )
  return (
    <div className='overflow-x-auto'>
      <table className='table w-4/5 m-auto'>
        <thead>
          <tr className=''>
            <th>
              <Link href='/users?sortOrder=name'>Name</Link>
            </th>
            <th>
              <Link href='/users?sortOrder=email'>Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortUsers.map(user => (
            <tr className='hover' key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
