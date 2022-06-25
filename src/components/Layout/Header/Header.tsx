import Link from 'next/link'
import Container from '../Container'
import HeaderNav from './HeaderNav'

const Header = () => {
  return (
    <header className='flex flex-col justify-center align-middle border-b-2 border-gray-800 h-16'>
      <Container>
        <div className='flex flex-col justify-center align-middle'>
          <Link href='/'>🔥 Logo</Link>
        </div>
        <HeaderNav />
      </Container>
    </header>
  )
}

export default Header
