import { useContext, useEffect, useState, useRef, RefObject } from 'react'
import { GlobalContext, ThemeContext } from '../../global/contexts'
import { Header, SwapSection } from '../../global/components'
import { View } from '../../global/types'
import { LandingSection, CaptionSection, ObjectivesSection, SubscribeSection } from './sections'

import './landing_page.scss'
import { config, determineActiveSection, generateSectionModifiers, getTopOffset } from './utils'

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

  const sections = [
    {
      scrollClue: `${copy.mission_title_prefix} dweb.md`,
      children: <LandingSection />
    },
    {
      children: (
        <CaptionSection key="caption_section_1">
          {copy.mission_title_prefix} <b>dweb.md</b>
        </CaptionSection>
      )
    },
    {
      children: <CaptionSection key="caption_section_2">{copy.mission_of_dwebmd}</CaptionSection>
    },
    { children: <CaptionSection key="caption_section_3">{copy.objectives}</CaptionSection> },
    { children: <ObjectivesSection /> },
    { children: <SubscribeSection /> }
  ]

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
    const offset = window.innerWidth < 720 ? getTopOffset(refs[activeSection]) : 0
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

  function navHandler(toSection: number) {
    setActiveSection(toSection)
    if (view === View.mobile) window.scroll(0, getTopOffset(refs[toSection]))
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
        <Header navHandler={navHandler} />
        <div className="body">{renderSections()}</div>
      </div>
    </ThemeContext.Provider>
  )
}

export default LandingPage
