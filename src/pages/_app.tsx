import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'
import AuthProvider from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default MyApp
