import Link from 'next/link'
import React from 'react'

const HeaderNavLink: React.FC<React.ComponentProps<'a'>> = ({
  href,
  children
}) => {
  if (!href) return null
  return (
    <Link href={href}>
      <li className='flex justify-center align-center'>
        <a
          href={href}
          className='px-4 py-2 flex align-center justify-center text-xs font-bold whitespace-nowrap transition cursor-pointer hover:text-gray-300'
        >
          {children}
        </a>
      </li>
    </Link>
  )
}

export default HeaderNavLink
