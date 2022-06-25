import { DeckFirebaseTypes, DeckStateTypes } from "../contexts/DeckTypes"
import safeParseJson from "./safeParseJson"

export function formatDeckFirebaseToState (deckState: DeckFirebaseTypes, id: string) {
  return {
    ...deckState,
    id,
    list: safeParseJson(deckState.list, true)
  }
}

export function formatDeckStateToFirebase (deckState: DeckStateTypes) {
  return {
    ...deckState,
    list: JSON.stringify(deckState.list)
  }
}
