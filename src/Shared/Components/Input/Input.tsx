import React from 'react'
import './Input.css'

interface Props {
  tipo: "text" | "select"
  value: string
  fn: (value: string) => void
  placeHolder?: string
  options?: string[]
}

const Input = ({
  tipo,
  value,
  fn,
  placeHolder,
  options
}: Props) => {

  switch (tipo) {

    case "text":
      return (
        <input
          type="text"
          placeholder={placeHolder}
          className={`Input-${tipo}`}
          value={value}
          onChange={(event) => fn(event.target.value)}
        />
      )

    case "select":
      return (
        <select
          className={`Input-${tipo}`}
          value={value}
          onChange={(event) => fn(event.target.value)}
        >

          <option value="">
            Selecione uma opção
          </option>

          {options?.map((option, index) => (
            <option
              key={index}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>
      )

    default:
      return null
  }
}

export default Input