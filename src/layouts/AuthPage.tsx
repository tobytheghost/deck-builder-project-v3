import Container from '@/components/Container'
import React from 'react'

interface AuthPageProps {
  children: React.ReactNode
}

const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
  return (
    <div className='flex-1 flex flex-col justify-center align-middle'>
      <Container>
        <div className='w-full'>{children}</div>
      </Container>
    </div>
  )
}

export default AuthPage
