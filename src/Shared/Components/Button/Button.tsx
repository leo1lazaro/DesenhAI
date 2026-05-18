import React from 'react'
import './Button.css'

interface props{
    text: string;
    fn: () => void;
}

const Button = (data: props) => {
  return (
    <button className='Button-container' onClick={data.fn}>
        {data.text}
    </button>
  )
}

export default Button