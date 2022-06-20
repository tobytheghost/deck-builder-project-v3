import { NextPage } from 'next'
import { useAuth } from '@/contexts/AuthContext'

const Home: NextPage = () => {
  const { currentUser } = useAuth()
  
  return (
    <div className='flex-1 text-center flex flex-col align-middle justify-center'>
      <h1 className='text-3xl font-bold underline'>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      {currentUser && `UID: ${currentUser.uid}`}
    </div>
  )
}

export default Home
