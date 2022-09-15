import { useContext } from 'react'
import { GlobalContext } from '../../contexts'
import Layout from '../Layout/Layout'
import NavButton from '../NavButton/NavButton'

import './header.scss'

type HeaderProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<number>>
}

// @todo add nav-related elements to a router/ folder
type Paths = '/' | '/mission' | '/objectives' | '/news'

const pathToSectionMapping = {
  '/': 0,
  '/mission': 1,
  '/objectives': 3,
  '/news': 5
}

function Header({ setActiveSection }: HeaderProps) {
  const { copy } = useContext(GlobalContext)

  const onClickGoTo = (to: Paths) => () => setActiveSection(pathToSectionMapping[to])

  return (
    <div className="header">
      <Layout>
        <div className="header__contents">
          <img
            className="header__logo"
            src="/img/dwebmd_logo.svg"
            alt="logo"
            onClick={onClickGoTo('/')}
          />
          <div className="header__nav">
            <NavButton text={copy.home} onClick={onClickGoTo('/')} />
            <NavButton text={copy.mission} onClick={onClickGoTo('/mission')} />
            <NavButton text={copy.objectives} onClick={onClickGoTo('/objectives')} />
            <NavButton text={copy.news} onClick={onClickGoTo('/news')} />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Header
