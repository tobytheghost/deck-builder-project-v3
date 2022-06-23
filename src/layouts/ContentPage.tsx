import React from 'react'

interface ContentPageProps {
  children: React.ReactNode
}

const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ContentPage
