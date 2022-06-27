import { DeckStateTypes } from '@/contexts/DeckContext'
import Image from 'next/image'

const DeckCard: React.FC<DeckStateTypes> = ({ image, deck_name: deckName, tag }) => {
  return (
    <div className='flex-1 border-gray-300 border-1 p-4 border rounded flex flex-col justify-start align-middle bg-gray-800 text-center relative w-75'>
      <div className='text-md mb-2 w-full'>{deckName}</div>
      <div>{tag}</div>
      <div className='relative' style={{ paddingBottom: `calc(7/5 * 100%)` }}>
        <Image src={image} alt={deckName} layout='fill' />
      </div>
    </div>
  )
}

export default DeckCard
