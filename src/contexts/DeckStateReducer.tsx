import { DeckReducerActionType, DeckStateTypes } from "./DeckContext"

export const deckStateActions = {
  SET_DECK: 'SET_DECK'
}

const deckReducer = (
  deck: DeckStateTypes,
  action: DeckReducerActionType
) => {
  switch (action.type) {
    case deckStateActions.SET_DECK:
      return {
        ...deck,
        ...action.payload
      }
  }
  return deck
}

export default deckReducer
