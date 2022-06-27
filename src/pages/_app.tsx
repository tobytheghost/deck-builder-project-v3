import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'
import AuthProvider, { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { withTRPC } from '@trpc/next'
import { AppRouter } from '@/server/router'
import AccountContextProvider, { useAccountContext } from '@/contexts/AccountContext'
import accountReducer from '@/contexts/AccountStateReducer'
import { initialAccountState } from '@/contexts/AccountStateReducer'
import { trpc } from '@/server/trpc'
import { useEffect } from 'react'

const MyAppWrapper: AppType = (props) => {
  return (
    <AuthProvider>
      <AccountContextProvider
        reducer={accountReducer}
        initialState={initialAccountState}
      >
        <MyApp {...props} />
      </AccountContextProvider>
    </AuthProvider>
  )
}

const MyApp: AppType = ({ Component, pageProps }) => {
  const [accountState, dispatch] = useAccountContext()
  const { data } = trpc.useQuery(['account.get', { }])
  const user = data && data.user || null

  useEffect(() => {
    if (!user || (accountState.user && accountState.user.user_id)) return
    dispatch({ type: 'SET_USER', payload: { user } })
  }, [accountState.user, user, dispatch])

  return (
    <>
      <Header />
      <main className='h-max flex flex-1 flex-col'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default withTRPC<AppRouter>({
  config ({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'
    return { url }
  },
  ssr: true
})(MyAppWrapper)
