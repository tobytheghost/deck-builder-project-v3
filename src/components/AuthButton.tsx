import React from 'react'

const AuthButton: React.FC<React.ComponentProps<'button'>> = ({
  children,
  ...rest
}) => {
  return <button className='bg-green-700 font-bold px-4 py-2 text-white rounded hover:bg-green-800 transition-colors' {...rest}>{children}</button>
}

export default AuthButton
