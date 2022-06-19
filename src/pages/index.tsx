import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='h-screen w-screen text-center flex flex-col align-middle justify-center'>
      <h1 className='text-3xl font-bold underline'>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
    </div>
  )
}

export default Home
