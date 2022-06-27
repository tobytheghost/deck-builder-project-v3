import { useContext, createContext, useReducer } from 'react'
import { initialAccountState } from './AccountStateReducer'
import { Dispatch } from 'react'
import { Timestamp } from '../firebase'
import { DeckStateTypes } from './DeckContext'

export interface UserStateType {
  display_name: string | undefined
  user_id: string | undefined
  user_since: Timestamp | undefined,
}

export interface AccountStateTypes {
  loaded: boolean
  decks: DeckStateTypes[] | undefined
  user: UserStateType
}

export interface AccountActionTypes {
  type: string
  payload?: any
}

export type AccountReducerType = (
  state: AccountStateTypes,
  action: AccountActionTypes
) => AccountStateTypes

export interface AccountContextProviderType {
  reducer: AccountReducerType
  initialState: AccountStateTypes
  children: React.ReactNode
}

export type AccountReducerTypes = [
  AccountStateTypes,
  Dispatch<AccountActionTypes>
]

const AccountContext = createContext<AccountReducerTypes>([
  initialAccountState,
  () => null
])

const AccountContextProvider = ({
  reducer,
  initialState,
  children
}: AccountContextProviderType) => {
  return (
    <AccountContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AccountContext.Provider>
  )
}

export function useAccountContext () {
  return useContext(AccountContext)
}

export default AccountContextProvider
