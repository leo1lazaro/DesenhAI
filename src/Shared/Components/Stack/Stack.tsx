import { type ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Stack = ({ children }: Props) => {
  return <div className="Stack">{children}</div>
}

export default Stack