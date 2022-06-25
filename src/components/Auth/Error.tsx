const AuthError: React.FC<{ error: string }> = ({ error }) => {
  if (!error || error === '') return null
  return <p className='font-bold text-red-500 text-center'>{error}</p>
}

export default AuthError
