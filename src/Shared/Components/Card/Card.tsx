import React, { type ReactNode } from 'react'
import './Card.css'

interface Props {
  title: string
  alignTitle: 'center' | 'left' | 'right'
  children: ReactNode
}

const Card = ({ title, alignTitle, children }: Props) => {
  return (
    <section className='Card-container'>

      <h2 className={`Card-title ${alignTitle}`}>
        {title}
      </h2>

      {children}

    </section>
  )
}

export default Card