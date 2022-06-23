import Container from '@/components/Container'
import ProfileButton from '@/components/FormButton'
import ProfileForm from '@/components/ProfileForm'
import ProfileInput from '@/components/ProfileInput'
import { NextPage } from 'next'
import { useRef } from 'react'

const Profile: NextPage = () => {
  const displayNameInput = useRef(null)

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
          <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-start align-middle bg-gray-800 text-center'>Bio</div>
        </div>
      </div>
    </Container>
  )
}

export default Profile
