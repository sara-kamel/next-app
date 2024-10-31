import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/authOption'

export default async function Home () {
  const session = await getServerSession(authOptions)
  return (
    <main className='p-5'>
      <h1>hello {session && <span>{session.user?.name}</span>}</h1>
      <br />
      <Link className='btn btn-primary' data-theme='cupCake' href='/users'>
        Users
      </Link>

      <br />
      <br />
      <ProductCard />
    </main>
  )
}
