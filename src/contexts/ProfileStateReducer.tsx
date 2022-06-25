import {
  ProfileActionTypes,
  ProfileStateTypes,
  UserStateType
} from './ProfileContext'

export const initialUserState: UserStateType = {
  display_name: '',
  user_id: '',
  user_since: null
}

export const initialProfileState: ProfileStateTypes = {
  loading: true,
  decks: [],
  user: initialUserState
}

export const profileStateActions = {
  SET_LOADING: 'SET_LOADING',
  SET_PROFILE: 'SET_PROFILE',
  SET_DECKS: 'SET_DECKS',
  SET_USER: 'SET_USER'
}

const profileReducer = (
  state: ProfileStateTypes,
  action: ProfileActionTypes
) => {
  switch (action.type) {
    case profileStateActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case profileStateActions.SET_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case profileStateActions.SET_DECKS:
      return {
        ...state,
        decks: action.payload.decks,
        loading: false
      }
    case profileStateActions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      }
    default:
      return state
  }
}

export default profileReducer
