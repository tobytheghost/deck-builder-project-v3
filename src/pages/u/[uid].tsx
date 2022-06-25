import Container from '@/components/Layout/Container'
import { useProfileState } from '@/hooks/useProfileState'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ProfileProvider from '@/contexts/ProfileContext'
import profileReducer, {
  initialProfileState
} from '@/contexts/ProfileStateReducer'
import Error from 'next/error'

const PublicProfileContainer: NextPage = () => {
  return (
    <ProfileProvider
      reducer={profileReducer}
      initialState={initialProfileState}
    >
      <PublicProfile />
    </ProfileProvider>
  )
}

const PublicProfile: NextPage = () => {
  const router = useRouter()
  const { uid } = router.query
  const { profileState, isProfileError, isProfileLoading } = useProfileState(
    uid ? (Array.isArray(uid) ? uid[0] : uid) : null
  )
  const { user } = profileState
  const { display_name: displayName } = user

  if (isProfileError) router.replace('/404', router.asPath, { shallow: true })
  if (isProfileLoading) return null

  return (
    <Container className='py-8'>
      <h1 className='text-center text-3xl mb-4 w-full'>
        {displayName}&#39;s profile
      </h1>
    </Container>
  )
}

export default PublicProfileContainer
