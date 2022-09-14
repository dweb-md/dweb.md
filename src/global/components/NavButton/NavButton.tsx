import { MouseEventHandler } from 'react'
import './nav_button.scss'

function NavButton({ text, onClick }: { text: string; onClick: MouseEventHandler }) {
  return (
    <div className="nav-button" onClick={onClick}>
      {text}
    </div>
  )
}

export default NavButton
