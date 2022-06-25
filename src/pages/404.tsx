import Container from '@/components/Layout/Container'
import Link from 'next/link'

export default function FourOhFour () {
  return (
    <div className='flex-1 text-center flex flex-col align-middle justify-center'>
      <h1 className='text-3xl font-bold mb-4'>404 - Page not found</h1>
      <Link href='/'>
        <a className='bg-green-700 font-bold px-4 py-2 text-white rounded hover:bg-green-800 transition-colors w-max mx-auto'>Go back home</a>
      </Link>
    </div>
  )
}
