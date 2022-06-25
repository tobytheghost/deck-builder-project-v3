import { useRef, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/Auth/Form'
import AuthInput from '@/components/Auth/Input'
import AuthPage from '@/layouts/AuthPage'
import AuthButton from '@/components/Form/Button'
import AuthError from '@/components/Auth/Error'

const ForgotPassword: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!emailRef.current) return
    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      router.push('/')
    } catch (error) {
      console.error(error)
      setError('Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <AuthPage>
      <h1 className='mt-2 mx-auto text-center text-3xl mb-4'>Forgot Password</h1>
      <AuthForm onSubmit={handleSubmit}>
        <AuthError error={error} />
        <AuthInput type='email' innerRef={emailRef} required>
          Email
        </AuthInput>
        <AuthButton disabled={loading}>Reset</AuthButton>
        <hr className='mt-6 mb-3' />
        <p className='mx-auto text-center'>
          <Link href='/login'>
            <span className='cursor-pointer underline text-gray-300 underline-offset-2'>
              Back to Login
            </span>
          </Link>
        </p>
      </AuthForm>
      <p className='mt-2 mx-auto text-center'>
        Don&#39;t have an account?{' '}
        <Link href='/sign-up'>
          <span className='cursor-pointer underline text-gray-300 underline-offset-2'>
            Sign Up
          </span>
        </Link>
      </p>
    </AuthPage>
  )
}

export default ForgotPassword
