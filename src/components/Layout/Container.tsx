import React from 'react'

const Container: React.FC<React.ComponentProps<'section'>> = ({
  children,
  className,
  ...rest
}) => {
  return <section className={`max-w-7xl w-full m-0 mx-auto px-4 flex justify-between align-middle ${className ? className : ''}`} {...rest}>{children}</section>
}

export default Container
