import Button from '@/components/Form/Button'
import ProfileForm from '@/components/Profile/Form'
import ProfileInput from '@/components/Profile/Input'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { trpc } from '@/server/trpc'
import { useAccountContext } from '@/contexts/AccountContext'

const EditProfileContent: React.FC = () => {
  const displayNameInput = useRef(null)
  const [{ user }] = useAccountContext()
  const { user_id } = user
  const [displayNameValue, setDisplayNameValue] = useState('')

  useEffect(() => {
    if (!user || !user.display_name) return
    setDisplayNameValue(user.display_name)
  }, [user])

  const publicProfile = `/user/${user_id}`
  const updateAccount = trpc.useMutation(['account.update'])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!displayNameValue) return
    const payload = {
      display_name: displayNameValue
    }
    updateAccount.mutate(payload, {
      onError: console.error,
      onSuccess: console.log
    })
  }

  return (
    <div className='flex -mx-2'>
      <div className='flex flex-col flex-1 px-2'>
        <ProfileForm onSubmit={handleSubmit}>
          <ProfileInput
            innerRef={displayNameInput}
            value={displayNameValue}
            onChange={event =>
              setDisplayNameValue((event.target as HTMLInputElement).value)
            }
          >
            Display Name
          </ProfileInput>
          <Button className=''>Save</Button>
        </ProfileForm>
      </div>
      <div className='flex flex-col flex-1 px-2'>
        <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-start align-middle bg-gray-800 text-center'>
          {user.display_name}
          <Link href={publicProfile}>
            <button className='bg-green-700 font-bold px-4 py-2 text-white rounded hover:bg-green-800 transition-colors mx-auto mt-4'>
              View Public Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditProfileContent
