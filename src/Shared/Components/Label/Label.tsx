import { type ReactNode } from 'react'
import './Label.css'

interface Props {
    text: string
    modelo: 'up' | 'linear'
    children: ReactNode
}

const Label = ({ text, modelo, children }: Props) => {
    return (
        <div className='Label-container'>

            <span className={`Label-span ${modelo}`}>
                {text}
            </span>

            {children}

        </div>
    )
}

export default Label