import Container from '@/components/Layout/Container'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useProfileContext } from '@/contexts/ProfileContext'
import DecksContent from '@/components/Decks/DecksContent'
import useDeckContext, {
  DeckContextProvider,
  initialDeckState
} from '@/contexts/DeckContext'
import deckReducer from '@/contexts/DeckStateReducer'
import getDeck from '@/firebase/profile/getDeck'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { did } = ctx.query
    const lookupKey = did ? (Array.isArray(did) ? did[0] : did) : null
    const deck = await getDeck(lookupKey)

    if (!deck) {
      return {
        props: {} as never,
        notFound: true
      }
    }

    return { props: { deck } }
  } catch (err) {
    return {
      props: {} as never,
      notFound: true
    }
  }
}

const DeckContainer = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { deck } = props
  return (
    <DeckContextProvider
      reducer={deckReducer}
      initialState={{ ...initialDeckState, ...deck }}
    >
      <Deck />
    </DeckContextProvider>
  )
}

const Deck = () => {
  const [deckState] = useDeckContext()
  const { deck_name: deckName } = deckState

  return (
    <Container className='py-8 flex flex-col flex-wrap flex-1 !justify-start'>
      <h1 className='text-center text-3xl mb-4 w-full'>
        {deckName}
      </h1>
    </Container>
  )
}

export default DeckContainer
