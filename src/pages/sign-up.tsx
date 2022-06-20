import { useRef, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import AuthButton from '@/components/AuthButton'
import AuthForm from '@/components/AuthForm'
import AuthInput from '@/components/AuthInput'
import AuthError from '@/components/AuthError'
import AuthPage from '@/layouts/AuthPage'

const SignUp: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!emailRef.current) return setError('Please fill out all fields')
    if (!passwordRef.current) return setError('Please fill out all fields')
    if (!passwordConfirmRef.current)
      return setError('Please fill out all fields')

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      router.push('/')
    } catch (error) {
      console.error(error)
      setError('Failed to sign up')
    }
    setLoading(false)
  }

  return (
    <AuthPage>
      <h1 className='mt-2 mx-auto text-center text-3xl mb-4'>Sign Up</h1>
      <AuthForm onSubmit={handleSubmit}>
        <AuthError error={error} />
        <AuthInput type='email' innerRef={emailRef} required>
          Email
        </AuthInput>
        <AuthInput type='password' innerRef={passwordRef} required>
          Password
        </AuthInput>
        <AuthInput type='password' innerRef={passwordConfirmRef} required>
          Confirm Password
        </AuthInput>
        <AuthButton disabled={loading}>Sign Up</AuthButton>
      </AuthForm>
      <p className='mt-2 mx-auto text-center'>
        Already have an account?{' '}
        <Link href='/login'>
          <span className='cursor-pointer underline text-gray-300 underline-offset-2'>
            Login
          </span>
        </Link>
      </p>
    </AuthPage>
  )
}

export default SignUp
