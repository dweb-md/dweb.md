import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeaderProps = {
  joinLink: string
}

export default function Header({ joinLink }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth >= 768) setShowMenu(false)
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : 'unset'
  }, [showMenu])

  function toggleShowMenu(e: any) {
    setShowMenu(!showMenu)
    e.preventDefault()
  }

  return (
    <header>
      <div className="header">
        <div className="header__container">
          <div className="logo">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Dweb.md logo"
                width={400}
                height={125}
              />
            </Link>
          </div>
          <div className="nav">
            <Link href="/">Acasă</Link>
            <Link href="/resources">Resurse</Link>
            <Link href="/news">Noutăți</Link>
          </div>
          <div>
            <Link className="join-button" href={joinLink} target="_blank">
              Alătură-te
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`mobile-header${showMenu ? ' mobile-header--unfold' : ''}`}
      >
        <div className="overlay" onClick={() => setShowMenu(false)} />

        <div className="mobile-header__container">
          <div className="logo">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Dweb.md logo"
                width={400}
                height={125}
              />
            </Link>
          </div>
        </div>

        <div className="mobile-header__menu">
          <Link href="/">Acasă</Link>
          <Link href="/resources">Resurse</Link>
          <Link href="/news">Noutăți</Link>
        </div>

        <div className="mobile-header__button" onClick={toggleShowMenu}>
          <div className="button-icon">
            <div className="button-line" />
            <div className="button-line" />
            <div className="button-line" />
          </div>
        </div>
      </div>
    </header>
  )
}
