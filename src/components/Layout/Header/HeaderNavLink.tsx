import Link from 'next/link'
import React from 'react'

const HeaderNavLink: React.FC<React.ComponentProps<'a'>> = ({
  href,
  children
}) => {
  if (!href) return null
  return (
    <Link href={href}>
      <li className=''>
        <a
          href={href}
          className='px-4 py-3 flex align-middle justify-center text-sm font-bold whitespace-nowrap transition cursor-pointer hover:text-gray-300'
        >
          {children}
        </a>
      </li>
    </Link>
  )
}

export default HeaderNavLink
