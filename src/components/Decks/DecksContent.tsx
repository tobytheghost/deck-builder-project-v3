import { DeckStateTypes } from '@/contexts/DeckContext'
import Button from '../Form/Button'
import DeckCard from './DeckCard'

const DecksContent: React.FC<{ decks: DeckStateTypes[] }> = ({ decks }) => {
  return (
    <div className='flex -mx-2 flex-wrap justify-center'>
      {decks.map(deck => (
        <div key={deck.deck_name} className='flex flex-col px-2 mb-4'>
          <DeckCard {...deck}>{deck.deck_name}</DeckCard>
        </div>
      ))}
      <div className='flex flex-col px-2 mb-4'>
        <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-center align-middle bg-gray-800 text-center w-75'>
          <Button className='mx-auto'>Add New</Button>
        </div>
      </div>
    </div>
  )
}

export default DecksContent
