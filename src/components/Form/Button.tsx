import React from 'react'

const Button: React.FC<React.ComponentProps<'button'>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={[
        'bg-green-700 font-bold px-4 py-2 text-white rounded hover:bg-green-800 transition-colors',
        className
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
