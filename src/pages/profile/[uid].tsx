import Container from '@/components/Container'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const PublicProfile: NextPage = () => {
  const router = useRouter()
  const { uid } = router.query
  return (
    <Container className='py-8'>
      <h1 className='text-center text-3xl mb-4 w-full'>UIDs: Public Profile</h1>
    </Container>
  )
}

export default PublicProfile
