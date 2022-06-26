import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'
import AuthProvider from '@/contexts/AuthContext'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { withTRPC } from '@trpc/next'
import { AppRouter } from '@/backend/router'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Header />
      <main className='h-max flex flex-1 flex-col'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
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
})(MyApp)
