import Container from '@/components/Layout/Container'
import ProfileButton from '@/components/Form/Button'
import ProfileForm from '@/components/Profile/Form'
import ProfileInput from '@/components/Profile/Input'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import ProfileProvider from '@/contexts/ProfileContext'
import profileReducer, {
  initialProfileState
} from '@/contexts/ProfileStateReducer'
import { useProfileState } from '@/hooks/useProfileState'
import { useAuth } from '@/contexts/AuthContext'

const ProfileContainer: NextPage = () => {
  return (
    <ProfileProvider
      reducer={profileReducer}
      initialState={initialProfileState}
    >
      <Profile />
    </ProfileProvider>
  )
}

const Profile: NextPage = () => {
  const displayNameInput = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const uid = currentUser && currentUser.uid
  const { isProfileError, isProfileLoading } = useProfileState(uid)

  useEffect(() => {
    setIsLoading(false)
  }, [isProfileLoading])

  if (isProfileError) return null
  if (isLoading) return <div>Loading profile...</div>

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <Container className='py-8 flex flex-col flex-wrap flex-1 !justify-start'>
      <h1 className='text-center text-3xl mb-4 w-full'>Profile</h1>
      <div className='flex -mx-2'>
        <div className='flex flex-col flex-1 px-2'>
          <ProfileForm onSubmit={handleSubmit}>
            <ProfileInput innerRef={displayNameInput}>
              Display Name
            </ProfileInput>
            <ProfileButton className=''>Save</ProfileButton>
          </ProfileForm>
        </div>
        <div className='flex flex-col flex-1 px-2'>
          <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-start align-middle bg-gray-800 text-center'>
            Bio
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProfileContainer
