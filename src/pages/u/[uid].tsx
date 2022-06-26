import Container from '@/components/Layout/Container'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import ProfileProvider, { useProfileContext } from '@/contexts/ProfileContext'
import profileReducer, {
  initialProfileState
} from '@/contexts/ProfileStateReducer'
import getUser from '@/firebase/profile/getUser'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { uid } = ctx.query
    const user = await getUser(uid ? (Array.isArray(uid) ? uid[0] : uid) : null)

    if (!user) {
      return {
        props: {} as never,
        notFound: true
      }
    }

    return { props: { uid, user } }
  } catch (err) {
    return {
      props: {} as never,
      notFound: true
    }
  }
}

const PublicProfileContainer = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { user } = props
  return (
    <ProfileProvider
      reducer={profileReducer}
      initialState={{ ...initialProfileState, user }}
    >
      <PublicProfile />
    </ProfileProvider>
  )
}

const PublicProfile = () => {
  const [profileState] = useProfileContext()
  const { user } = profileState
  const { display_name: displayName } = user

  return (
    <Container className='py-8'>
      <h1 className='text-center text-3xl mb-4 w-full'>
        {displayName}&#39;s profile
      </h1>
    </Container>
  )
}

export default PublicProfileContainer
