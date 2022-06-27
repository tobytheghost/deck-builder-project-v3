import { useAccountContext } from '@/contexts/AccountContext'
import { logout, useAuth } from '@/contexts/AuthContext'
import ProfileNavLink from './ProfileNavLink'

const HeaderNav = () => {
  const [{ user }] = useAccountContext()
  return (
    <nav className='flex-1 flex flex-wrap align-middle justify-center'>
      <div className='px-3 py-2 -ml-2 flex align-center justify-center text-sm font-bold whitespace-nowrap'>
        {user.display_name ? `Welcome, ${user.display_name}!` : 'Welcome!'}
      </div>
      <ul className='flex-1 flex align-center justify-end'>
        <ProfileNavLink href='/account/my-profile'>My Profile</ProfileNavLink>
        <ProfileNavLink href='/account/my-decks'>My Decks</ProfileNavLink>
        <li className='flex justify-center align-middle'>
          <button
            onClick={logout}
            className='px-3 py-2 ml-2 flex align-center justify-center text-xs font-bold whitespace-nowrap transition cursor-pointer hover:text-gray-300 rounded-lg bg-red-700 hover:bg-red-800'
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNav
