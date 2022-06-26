import Container from '@/components/Layout/Container'
import ProfileButton from '@/components/Form/Button'
import ProfileForm from '@/components/Profile/Form'
import ProfileInput from '@/components/Profile/Input'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useRef, useState } from 'react'
import profileReducer from '@/contexts/ProfileStateReducer'
import nookies from 'nookies'
import { auth } from '@/firebase/admin'
import getUser from '@/firebase/profile/getUser'
import AccountContextProvider, {
  useAccountContext
} from '@/contexts/AccountContext'
import { initialAccountState } from '@/contexts/AccountStateReducer'
import { trpc } from '@/backend/trpc'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await auth.verifyIdToken(cookies.token)
    const { uid } = token
    const user = await getUser(uid)

    if (!user) {
      return {
        props: {} as never,
        notFound: true
      }
    }

    return { props: { uid, user } }
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()

    return { props: {} as never }
  }
}

const AccountContainer = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { user } = props
  return (
    <AccountContextProvider
      reducer={profileReducer}
      initialState={{ ...initialAccountState, user }}
    >
      <Account {...props} />
    </AccountContextProvider>
  )
}

const Account = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const displayNameInput = useRef(null)
  const [accountState] = useAccountContext()
  const { user } = accountState
  const [displayNameValue, setDisplayNameValue] = useState(user.display_name)

  const mutation = trpc.useMutation(['post.profile'])
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    mutation.mutate({
      display_name: displayNameValue
    },
    {
      onError: (error) => console.error(error),
      onSuccess: (data) => console.log(data),
    })

    // await fetch('/api/account/update', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     display_name: displayNameValue
    //   }),
    // })
  }

  return (
    <Container className='py-8 flex flex-col flex-wrap flex-1 !justify-start'>
      <h1 className='text-center text-3xl mb-4 w-full'>Profile</h1>
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
            <ProfileButton className=''>Save</ProfileButton>
          </ProfileForm>
        </div>
        <div className='flex flex-col flex-1 px-2'>
          <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-start align-middle bg-gray-800 text-center'>
            {user.display_name}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AccountContainer
