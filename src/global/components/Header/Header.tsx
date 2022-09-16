import { useContext } from 'react'
import { GlobalContext, ThemeContext } from '../../contexts'
import Layout from '../Layout/Layout'
import NavButton from '../NavButton/NavButton'

import './header.scss'

type HeaderProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<number>>
}

// @todo add nav-related elements to a router/ folder
type Paths = '/' | '/mission' | '/objectives' | '/community'

const pathToSectionMapping = {
  '/': 0,
  '/mission': 1,
  '/objectives': 3,
  '/community': 5
}

function Header({ setActiveSection }: HeaderProps) {
  const { copy } = useContext(GlobalContext)
  const { darkTheme } = useContext(ThemeContext)

  const onClickGoTo = (to: Paths) => () => setActiveSection(pathToSectionMapping[to])

  const themeConfig = darkTheme
    ? { class: 'header header--dark', logoSrc: '/img/dwebmd_logo_inv.svg' }
    : { class: 'header', logoSrc: '/img/dwebmd_logo.svg' }

  return (
    <div className={themeConfig.class}>
      <Layout>
        <div className="header__contents">
          <img
            className="header__logo"
            src={themeConfig.logoSrc}
            alt="logo"
            onClick={onClickGoTo('/')}
          />
          <div className="header__nav">
            <NavButton text={copy.home} onClick={onClickGoTo('/')} />
            <NavButton text={copy.mission} onClick={onClickGoTo('/mission')} />
            <NavButton text={copy.objectives} onClick={onClickGoTo('/objectives')} />
            <NavButton text={copy.community} onClick={onClickGoTo('/community')} />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Header
