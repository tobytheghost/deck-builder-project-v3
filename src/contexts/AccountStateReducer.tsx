import {
  AccountActionTypes,
  AccountStateTypes,
  UserStateType
} from './AccountContext'

export const initialUserState: UserStateType = {
  display_name: undefined,
  user_id: undefined,
  user_since: undefined
}

export const initialAccountState: AccountStateTypes = {
  loaded: false,
  decks: [],
  user: initialUserState
}

export const AccountStateActions = {
  SET_PROFILE: 'SET_PROFILE',
  SET_DECKS: 'SET_DECKS',
  SET_USER: 'SET_USER'
}

const accountReducer = (
  state: AccountStateTypes,
  action: AccountActionTypes
) => {
  switch (action.type) {
    case AccountStateActions.SET_PROFILE:
      return {
        ...state,
        ...action.payload,
        loaded: true
      }
    case AccountStateActions.SET_DECKS:
      return {
        ...state,
        decks: action.payload.decks,
        loaded: true
      }
    case AccountStateActions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        loaded: true
      }
    default:
      return state
  }
}

export default accountReducer
