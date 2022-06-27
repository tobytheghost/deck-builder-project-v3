import React from 'react'

const tags = {
  none: {
    name: 'None',
    color: '#fff'
  },
  brawl: {
    name: 'Brawl',
    color: '#fff'
  },
  edh: {
    name: 'EDH / Commander',
    color: '#fff'
  },
  historic: {
    name: 'Historic',
    color: '#fff'
  },
  legacy: {
    name: 'Legacy',
    color: '#fff'
  },
  modern: {
    name: 'Modern',
    color: '#fff'
  },
  pauper: {
    name: 'Pauper',
    color: '#fff'
  },
  pioneer: {
    name: 'Pioneer',
    color: '#fff'
  },
  standard: {
    name: 'Standard',
    color: '#fff'
  },
  vintage: {
    name: 'Vintage',
    color: '#fff'
  }
}

export type Tags = keyof typeof tags

export const Tag: React.FC<{ tag: Tags }> = ({ tag }) => {
  const data = tags[tag]
  return <div>{data.name}</div>
}
