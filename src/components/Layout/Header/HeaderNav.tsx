import { useAuth } from '@/contexts/AuthContext'
import HeaderNavLink from './HeaderNavLink'

const HeaderNav = () => {
  const { currentUser } = useAuth()
  return (
    <nav className='flex-1 flex flex-wrap align-middle justify-center'>
      <ul className='flex-1 flex align-middle justify-end'>
        {currentUser ? (
          <>
            <HeaderNavLink href='/profile'>Profile</HeaderNavLink>
            <HeaderNavLink href='/decks'>Decks</HeaderNavLink>
          </>
        ) : (
          <HeaderNavLink href='/login'>Login</HeaderNavLink>
        )}
      </ul>
    </nav>
  )
}

export default HeaderNav
