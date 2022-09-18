import { useContext, useEffect, useState, useRef } from 'react'
import { GlobalContext, ThemeContext } from '../../global/contexts'
import { Header, SwapSection } from '../../global/components'
import { View } from '../../global/types'

import './landing_page.scss'
import {
  config,
  determineActiveSection,
  generateSectionModifiers,
  generateSectionConfigs,
  getTopOffset
} from './utils'

function LandingPage() {
  const { copy, view } = useContext(GlobalContext)

  const [sectionModifiers, setSectionModifiers] = useState(generateSectionModifiers(0))
  const [offset, setOffset] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [scrollFrozen, setScrollFrozen] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)

  const refs = Array(6)
    .fill(0)
    .map(() => useRef<HTMLDivElement>(null))

  const sections = generateSectionConfigs(copy)

  useEffect(() => {
    setOffset(300)

    const newSectionModifiers = generateSectionModifiers(activeSection)
    setSectionModifiers(newSectionModifiers)
    setScrollFrozen(true)

    setDarkTheme(activeSection === 5 && view === View.desktop)

    setTimeout(() => setScrollFrozen(false), config.SCROLL_FREEZE_DURATION)
  }, [activeSection])

  useEffect(() => {
    setDarkTheme(activeSection === 5 && view === View.desktop)

    const offset = view === View.mobile ? getTopOffset(refs[activeSection]) : 0
    window.scroll(0, offset)
  }, [view])

  function onWheelHandler({ deltaY }: { deltaY: number }) {
    if (view === View.mobile) {
      setActiveSection(determineActiveSection(refs))
    } else if (!scrollFrozen) {
      const newOffset = offset + deltaY

      if (newOffset <= config.MIN_OFFSET) {
        setActiveSection(Math.max(activeSection - 1, 0))
      } else if (newOffset >= config.MAX_OFFSET) {
        setActiveSection(Math.min(activeSection + 1, config.SECTIONS_COUNT - 1))
      } else {
        setOffset(newOffset)
      }
    }
  }

  function goToHandler(toSection: number) {
    // set smooth behavior before navigating to section
    if (view === View.mobile) document.documentElement.style.scrollBehavior = 'smooth'

    setActiveSection(toSection)

    if (view === View.mobile) {
      window.scroll(0, getTopOffset(refs[toSection]))

      // reset scroll behavior
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'initial'
      }, 1000)
    }
  }

  function renderSections() {
    return sections.map((config, index) => (
      <SwapSection
        key={`swap_section_${index}`}
        ref={refs[index]}
        modifier={sectionModifiers[index]}
        scrollClue={config.scrollClue}
      >
        {config.children}
      </SwapSection>
    ))
  }

  return (
    <ThemeContext.Provider value={{ darkTheme }}>
      <div onWheel={onWheelHandler} className={`landing-page${darkTheme ? '--dark' : ''}`}>
        <Header goToHandler={goToHandler} />
        <div className="body">{renderSections()}</div>
      </div>
    </ThemeContext.Provider>
  )
}

export default LandingPage
