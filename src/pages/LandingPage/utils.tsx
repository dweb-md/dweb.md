import { RefObject } from 'react'
import { copy } from '../../global/localization'
import { CaptionSection, LandingSection, ObjectivesSection, SubscribeSection } from './sections'

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

function generateSectionConfigs(localization: typeof copy.ro) {
  return [
    {
      scrollClue: `${localization.mission_title_prefix} dweb.md`,
      children: <LandingSection />
    },
    {
      scrollClue: '',
      children: (
        <CaptionSection key="caption_section_1">
          {localization.mission_title_prefix} <b>dweb.md</b>
        </CaptionSection>
      )
    },
    {
      scrollClue: '',
      children: (
        <CaptionSection key="caption_section_2">{localization.mission_of_dwebmd}</CaptionSection>
      )
    },
    {
      scrollClue: '',
      children: <CaptionSection key="caption_section_3">{localization.objectives}</CaptionSection>
    },
    { scrollClue: '', children: <ObjectivesSection /> },
    { children: <SubscribeSection /> }
  ]
}

function determineActiveSection(refs: Array<RefObject<HTMLDivElement>>) {
  for (let i = 0; i < refs.length; i++) {
    const offsetTop = getTopOffset(refs[i])
    const clientHeight = getClientHeight(refs[i])

    if (offsetTop + clientHeight * 0.4 >= window.scrollY) return i
  }

  return refs.length - 1
}

function getTopOffset(ref: RefObject<HTMLDivElement>): number {
  return ref?.current?.offsetTop ?? 0
}

function getClientHeight(ref: RefObject<HTMLDivElement>): number {
  return ref?.current?.clientHeight ?? 0
}

export {
  config,
  generateSectionModifiers,
  generateSectionConfigs,
  determineActiveSection,
  getTopOffset,
  getClientHeight
}
