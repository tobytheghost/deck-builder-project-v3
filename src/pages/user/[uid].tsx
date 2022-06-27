import Container from '@/components/Layout/Container'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import ProfileProvider, { useProfileContext } from '@/contexts/ProfileContext'
import profileReducer, {
  initialProfileState
} from '@/contexts/ProfileStateReducer'
import getUser from '@/firebase/profile/getUser'
import getDecks from '@/firebase/profile/getDecks'
import DecksContent from '@/components/Decks/DecksContent'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { uid } = ctx.query
    const lookupKey = uid ? (Array.isArray(uid) ? uid[0] : uid) : null
    const user = await getUser(lookupKey)
    const decks = await getDecks(lookupKey)

    if (!user) {
      return {
        props: {} as never,
        notFound: true
      }
    }

    return { props: { uid, user, decks } }
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
  const { user, decks } = props
  return (
    <ProfileProvider
      reducer={profileReducer}
      initialState={{ ...initialProfileState, user, decks }}
    >
      <PublicProfile />
    </ProfileProvider>
  )
}

const PublicProfile = () => {
  const [profileState] = useProfileContext()
  const { user, decks } = profileState
  const { display_name: displayName } = user

  return (
    <Container className='py-8 flex flex-col flex-wrap flex-1 !justify-start'>
      <h1 className='text-center text-3xl mb-4 w-full'>
        {displayName}&#39;s profile
      </h1>
      {decks ? <DecksContent decks={decks} /> : null}
    </Container>
  )
}

export default PublicProfileContainer
