import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../global/contexts'
import { Header, SwapSection } from '../../global/components'
import { View } from '../../global/types'
import { LandingSection, CaptionSection, ObjectivesSection, SubscribeSection } from './sections'

import './landing_page.scss'

const config = {
  SECTIONS_COUNT: 6,
  MIN_OFFSET: 0,
  MAX_OFFSET: 600,
  SCROLL_FREEZE_DURATION: 1000
}

function generateSectionModifiers(activeSection: number) {
  const preCount = activeSection
  const postCount = config.SECTIONS_COUNT - activeSection - 1

  let modifiers = []
  if (preCount !== 0) modifiers = Array(preCount).fill('post')
  modifiers.push('active')
  if (postCount !== 0) modifiers.push(...Array(postCount).fill('pre'))

  return modifiers
}

function LandingPage() {
  const { copy, view } = useContext(GlobalContext)

  const [sectionModifiers, setSectionModifiers] = useState(generateSectionModifiers(0))
  const [offset, setOffset] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [scrollFrozen, setScrollFrozen] = useState(false)

  // @todo simplify
  const onWheelHandler: React.WheelEventHandler = ({ deltaY }) => {
    if (view === View.mobile || scrollFrozen) return

    const newOffset = offset + deltaY

    if (newOffset <= config.MIN_OFFSET) {
      setActiveSection(Math.max(activeSection - 1, 0))
    } else if (newOffset >= config.MAX_OFFSET) {
      setActiveSection(Math.min(activeSection + 1, config.SECTIONS_COUNT - 1))
    } else {
      setOffset(newOffset)
    }
  }

  useEffect(() => {
    setOffset(300)
    const newSectionModifiers = generateSectionModifiers(activeSection)
    setSectionModifiers(newSectionModifiers)
    setScrollFrozen(true)
    setTimeout(() => setScrollFrozen(false), config.SCROLL_FREEZE_DURATION)
  }, [activeSection])

  return (
    <div onWheel={onWheelHandler}>
      <Header setActiveSection={setActiveSection} />
      <div className="body">
        <SwapSection
          modifier={sectionModifiers[0]}
          scrollClue={`${copy.mission_title_prefix} dweb.md`}
        >
          <LandingSection />
        </SwapSection>
        <SwapSection modifier={sectionModifiers[1]}>
          <CaptionSection>
            {copy.mission_title_prefix} <b>dweb.md</b>
          </CaptionSection>
        </SwapSection>
        <SwapSection modifier={sectionModifiers[2]}>
          <CaptionSection>
            <b>{copy.mission_of_dwebmd}</b>
          </CaptionSection>
        </SwapSection>
        <SwapSection modifier={sectionModifiers[3]}>
          <CaptionSection>{copy.objectives}</CaptionSection>
        </SwapSection>
        <SwapSection modifier={sectionModifiers[4]}>
          <ObjectivesSection />
        </SwapSection>
        <SwapSection modifier={sectionModifiers[5]}>
          <SubscribeSection />
        </SwapSection>
      </div>
    </div>
  )
}

export default LandingPage
