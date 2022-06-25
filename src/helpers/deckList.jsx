import React from 'react'
import { Mana } from "@saeris/react-mana";

const parseTextForSymbols = text => {
  return text
    .replace(' // ', '{|}')
    .replace(/{(.*?)}/g, (match, string) => {
      return `${string.toLowerCase().replace('/', '')}_`
    })
    .split('_').filter(Boolean)
}

export const ManaSymbols = ({ text }) => {
  return (
    <React.Fragment>
      {parseTextForSymbols(text).map((item, i) => {
        if (item === '|') {
          return <span className='decklist__mana-split'>{'//'}</span>
        } else {
          return <Mana key={i} symbol={item} shadow fixed size='1x' />
        }
      })}
    </React.Fragment>
  )
}
