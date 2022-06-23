import React from 'react'

interface ProfilePageProps {
  onSubmit: (e: React.SyntheticEvent) => any
  children: React.ReactNode
  message?: string
  messageType?: 'error' | 'warn' | 'info' | 'success'
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  onSubmit,
  message,
  messageType,
  children
}) => {
  return (
    <div className='w-full mx-auto'>
      {message && <span className=''>{message}</span>}
      <form
        className='border-gray-300 border-1 p-4 border rounded flex flex-col justify-center align-middle bg-gray-800'
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  )
}

export default ProfilePage
