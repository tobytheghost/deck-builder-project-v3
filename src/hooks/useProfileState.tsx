import { useEffect, useState } from 'react'
import { useProfileContext, UserStateType } from '@/contexts/ProfileContext'
import { profileStateActions } from '@/contexts/ProfileStateReducer'
import { db, FirebaseSnapshot, FirestoreError } from '@/firebase'

export const useProfileState = (lookupId: string | null) => {
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isProfileError, setIsProfileError] = useState(false)
  const [profileState, dispatch] = useProfileContext()

  useEffect(() => {
    const userQuery = db.collection('users').where('user_id', '==', lookupId)

    const handleUserSnapshot = (querySnapshot: FirebaseSnapshot) => {
      try {
        const docs = querySnapshot.docs
        if (!docs.length) return setIsProfileError(true)
        const user = docs[0].data() as UserStateType
        dispatch({
          type: profileStateActions.SET_PROFILE,
          payload: { user }
        })
        setIsProfileLoading(false)
      } catch (err) {
        setIsProfileError(true)
        setIsProfileLoading(false)
      }
    }

    const handleUserSnapshotError = (error: FirestoreError) => {
      console.error(error)
      setIsProfileError(true)
    }

    return userQuery.onSnapshot(handleUserSnapshot, handleUserSnapshotError)
  }, [lookupId, dispatch])

  return {
    profileState,
    isProfileError,
    isProfileLoading
  }
}
