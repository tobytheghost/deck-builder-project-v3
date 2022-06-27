import { logout, useAuth } from '@/contexts/AuthContext'
import HeaderNavLink from './HeaderNavLink'

const HeaderNav = () => {
  const { currentUser } = useAuth()
  return (
    <nav className='flex-1 flex flex-wrap align-middle justify-center'>
      <ul className='flex-1 flex align-middle justify-end'>
        {!currentUser ? (
          <HeaderNavLink href='/login'>Login</HeaderNavLink>
        ) : null}
      </ul>
    </nav>
  )
}

export default HeaderNav
