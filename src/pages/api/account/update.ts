import { auth, db } from '@/firebase/admin'
import { getUserByUsername } from '@/firebase/profile/getUser'
import { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'

type Data = {
  message: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const cookies = nookies.get({ req })
  const token = await auth.verifyIdToken(cookies.token)
  const { uid } = token
  const { display_name } = req.body

  const user = await getUserByUsername(display_name)
  if (user && user.user_id !== uid) {
    res.status(409).json({ message: 'User already exists' })
    return
  }

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  db.collection('users')
    .doc(uid)
    .update({ display_name })

  res.status(200).json({ message: 'Updated display name' })
}
