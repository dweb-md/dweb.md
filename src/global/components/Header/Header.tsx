import { useContext, useState } from 'react'
import { GlobalContext, ThemeContext } from '../../contexts'
import { View } from '../../types'
import Layout from '../Layout/Layout'
import { NavButton, ImageLoader } from '..'

import './header.scss'

const LIGHT_THEME_LOGO = './img/dwebmd_logo.svg'
const DARK_THEME_LOGO = './img/dwebmd_logo_inv.svg'

type HeaderProps = {
  goToHandler: (toSection: number) => void
}

function Header({ goToHandler }: HeaderProps) {
  const { copy, view } = useContext(GlobalContext)
  const { darkTheme } = useContext(ThemeContext)
  const [scrollPosition, setScrollPosition] = useState(window.scrollY)
  const [hidden, setHidden] = useState(false)

  const logoSrc = darkTheme ? DARK_THEME_LOGO : LIGHT_THEME_LOGO

  const navConfig = [
    { text: copy.home, to: 0 },
    { text: copy.mission, to: 1 },
    { text: copy.objectives, to: 3 },
    { text: copy.community, to: 5 }
  ]

  window.addEventListener('scroll', () => {
    setHidden(scrollPosition - window.scrollY < 0)
    setScrollPosition(window.scrollY)
  })

  function getClassName() {
    let className = 'header'
    if (darkTheme) className += ' header--dark'
    if (view === View.mobile && hidden) className += ' header--hidden'
    return className
  }

  function renderNavButtons() {
    return navConfig.map(({ text, to }, index) => (
      <NavButton key={`nav_button_${index}`} text={text} onClick={() => goToHandler(to)} />
    ))
  }

  return (
    <div className={getClassName()}>
      <Layout>
        <div className="header__contents">
          <div className="header__logo" onClick={() => goToHandler(0)}>
            <ImageLoader src={logoSrc} alt="logo" />
          </div>
          <div className="header__nav">{renderNavButtons()}</div>
        </div>
      </Layout>
    </div>
  )
}

export default Header
