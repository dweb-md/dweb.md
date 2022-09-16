import { MouseEventHandler, useContext } from 'react'
import { ThemeContext } from '../../contexts'
import './nav_button.scss'

type NavButtonProps = {
  text: string
  onClick: MouseEventHandler
}

function NavButton({ text, onClick }: NavButtonProps) {
  const { darkTheme } = useContext(ThemeContext)

  return (
    <div className={`nav-button ${darkTheme ? 'nav-button--dark' : ''}`} onClick={onClick}>
      {text}
    </div>
  )
}

export default NavButton
