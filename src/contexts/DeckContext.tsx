import { useContext, createContext, useReducer, Dispatch } from 'react'
import { Timestamp } from '../firebase'

export interface DeckContextProviderType {
  reducer: DeckReducerType
  initialState: DeckStateTypes
  children: React.ReactNode
}

export interface DeckStateTypes {
  id: string
  image: string
  deck_name: string
  list: CardItemTypes[] | never[]
  user_id: string
  format: string
  tag: string
  timestamp?: Timestamp
}

export interface DeckFirebaseTypes extends Omit<DeckStateTypes, 'list'> {
  list: string
}

export interface CardItemTypes {
  id: string
  name: string
  cmc: number
  quantity: number
  board: string
  type: string
  layout: string
  mana_cost: string
  image: string
}

type CardLegality = 'not_legal' | 'legal'

export interface ScryfallDataTypes {
  name?: string,
  legalities?: {
    standard: CardLegality
    future: CardLegality
    historic: CardLegality
    gladiator: CardLegality
    pioneer: CardLegality
    explorer: CardLegality
    modern: CardLegality
    legacy: CardLegality
    pauper: CardLegality
    vintage: CardLegality
    penny: CardLegality
    commander: CardLegality
    brawl: CardLegality
    historicbrawl: CardLegality
    alchemy: CardLegality
    paupercommander: CardLegality
    duel: CardLegality
    oldschool: CardLegality
    premodern: CardLegality
  }
  image_uris?: {
    small: string,
    normal: string,
    large: string,
    border_crop: string
  }
  prices?: {
    usd: string | null
    usd_foil: string | null
    usd_etched: string | null
    eur: string | null
    eur_foil: string | null
    tix: string | null
  }
  related_uris?: {
    gatherer: string | null
    tcgplayer_infinite_articles: string | null
    tcgplayer_infinite_decks: string | null
    edhrec: string | null
  }
  purchase_uris?: {
    tcgplayer: string | null
    cardmarket: string | null
    cardhoarder: string | null
  },
  scryfall_uri?: string | null,
  border_color?: string
}

export interface DeckReducerActionType {
  type: string
  payload?: any
}

export type DeckReducerType = (
  state: DeckStateTypes,
  action: DeckReducerActionType
) => DeckStateTypes


type DeckContextTypes = [DeckStateTypes, Dispatch<DeckReducerActionType>]

export const initialDeckState: DeckStateTypes = {
  id: '',
  image: '',
  deck_name: '',
  list: [],
  user_id: '',
  tag: '',
  format: ''
}

const deckContext = createContext<DeckContextTypes>([
  initialDeckState,
  () => null
])

export const DeckContextProvider = ({
  reducer,
  initialState,
  children
}: DeckContextProviderType) => {
  return (
    <deckContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </deckContext.Provider>
  )
}

export default function useDeckContext () {
  return useContext(deckContext)
}
