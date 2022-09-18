import { useContext } from 'react'
import { GlobalContext, ThemeContext } from '../../contexts'
import Layout from '../Layout/Layout'
import NavButton from '../NavButton/NavButton'

import './header.scss'

type HeaderProps = {
  navHandler: (toSection: number) => void
}

function Header({ navHandler }: HeaderProps) {
  const { copy } = useContext(GlobalContext)
  const { darkTheme } = useContext(ThemeContext)

  const themeConfig = darkTheme
    ? { class: 'header header--dark', logoSrc: '/img/dwebmd_logo_inv.svg' }
    : { class: 'header', logoSrc: '/img/dwebmd_logo.svg' }

  const navConfig = [
    { text: copy.home, to: 0 },
    { text: copy.mission, to: 1 },
    { text: copy.objectives, to: 3 },
    { text: copy.community, to: 5 }
  ]

  function renderNavButtons() {
    return navConfig.map(({ text, to }, index) => (
      <NavButton key={`nav_button_${index}`} text={text} onClick={() => navHandler(to)} />
    ))
  }

  return (
    <div className={themeConfig.class}>
      <Layout>
        <div className="header__contents">
          <img
            className="header__logo"
            src={themeConfig.logoSrc}
            alt="logo"
            onClick={() => navHandler(0)}
          />
          <div className="header__nav">{renderNavButtons()}</div>
        </div>
      </Layout>
    </div>
  )
}

export default Header
