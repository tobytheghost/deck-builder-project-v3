import Container from '@/components/Layout/Container'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'
import nookies from 'nookies'
import { auth } from '@/firebase/admin'
import getUser from '@/firebase/profile/getUser'
import { useAccountContext } from '@/contexts/AccountContext'
import { trpc } from '@/server/trpc'
import DecksContent from '@/components/Decks/DecksContent'

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

const MyDecks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [{ user }, dispatch] = useAccountContext()
  const { user_id: uid } = user
  const { data } = trpc.useQuery(['decks.get', { uid }])
  const decks = (data && data.decks) || []

  return (
    <Container className='py-8 flex flex-col flex-wrap flex-1 !justify-start'>
      <h1 className='text-center text-3xl mb-4 w-full'>My Decks</h1>
      <DecksContent decks={decks} />
    </Container>
  )
}

export default MyDecks
