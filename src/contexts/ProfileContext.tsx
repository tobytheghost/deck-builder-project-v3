import { useContext, createContext, useReducer } from 'react'
import { initialProfileState } from './ProfileStateReducer'
import { Dispatch } from 'react'
import { Timestamp } from '../firebase'
import { DeckStateTypes } from './DeckContext'

export interface UserStateType {
  display_name: string
  user_id: string
  user_since: Timestamp | null
}

export interface ProfileStateTypes {
  loading: boolean
  decks: DeckStateTypes[] | undefined[]
  user: UserStateType
}

export interface ProfileActionTypes {
  type: string
  payload?: any
}

export type ProfileReducerType = (
  state: ProfileStateTypes,
  action: ProfileActionTypes
) => ProfileStateTypes

export interface ProfileContextProviderType {
  reducer: ProfileReducerType
  initialState: ProfileStateTypes
  children: React.ReactNode
}

export type ProfileReducerTypes = [
  ProfileStateTypes,
  Dispatch<ProfileActionTypes>
]

const ProfileContext = createContext<ProfileReducerTypes>([
  initialProfileState,
  () => null
])

const ProfileContextProvider = ({
  reducer,
  initialState,
  children
}: ProfileContextProviderType) => {
  return (
    <ProfileContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfileContext () {
  return useContext(ProfileContext)
}

export default ProfileContextProvider
