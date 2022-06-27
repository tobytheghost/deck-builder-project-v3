import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Container from '../Container'
import HeaderNav from './HeaderNav'
import ProfileNav from './ProfileNav'

const Header = () => {
  const { currentUser } = useAuth()
  return (
    <header>
      <div className='flex flex-col justify-center align-middle border-b-2 border-gray-800 h-16'>
        <Container>
          <div className='flex flex-col justify-center align-middle'>
            <Link href='/'>🔥 Logo</Link>
          </div>
          <HeaderNav />
        </Container>
      </div>
      {currentUser ? (
        <div className='flex flex-col justify-center align-middle border-b-2 border-gray-800 h-12'>
          <Container>
            <ProfileNav />
          </Container>
        </div>
      ) : null}
    </header>
  )
}

export default Header
