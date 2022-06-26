import {
  AccountActionTypes,
  AccountStateTypes,
  UserStateType
} from './AccountContext'

export const initialUserState: UserStateType = {
  display_name: '',
  user_id: '',
  user_since: null
}

export const initialAccountState: AccountStateTypes = {
  loading: true,
  decks: [],
  user: initialUserState
}

export const AccountStateActions = {
  SET_LOADING: 'SET_LOADING',
  SET_Account: 'SET_Account',
  SET_DECKS: 'SET_DECKS',
  SET_USER: 'SET_USER'
}

const accountReducer = (
  state: AccountStateTypes,
  action: AccountActionTypes
) => {
  switch (action.type) {
    case AccountStateActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case AccountStateActions.SET_Account:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case AccountStateActions.SET_DECKS:
      return {
        ...state,
        decks: action.payload.decks,
        loading: false
      }
    case AccountStateActions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      }
    default:
      return state
  }
}

export default accountReducer
