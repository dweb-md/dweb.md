import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../global/contexts'

import './landing_section.scss'
import { generateCardsConfig, getNextCardNumber, CARD_ADVANCE_INTERVAL } from './utils'

function LandingSection() {
  const { copy } = useContext(GlobalContext)
  const [inTransition, setInTransition] = useState(false)
  const [cardNumber, setCardNumber] = useState(0)

  const [timeoutId, setTimeoutId] = useState(-1)

  const cardsConfig = generateCardsConfig(copy)

  useEffect(() => {
    if (timeoutId === -1) setAdvanceCardTimeout(getNextCardNumber(cardNumber))
  }, [])

  function handleMouseEnter(e: any) {
    e.preventDefault()

    window.clearTimeout(timeoutId)
    setTimeoutId(0)
  }

  function handleMouseLeave(e: any) {
    e.preventDefault()

    if (timeoutId === 0) setAdvanceCardTimeout(getNextCardNumber(cardNumber))
  }

  function renderControls() {
    return Array(cardsConfig.length)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className={`control${index === cardNumber ? '--selected' : ''}`}
          onClick={() => transitionToCard(index)}
        />
      ))
  }

  function transitionToCard(index: number) {
    setInTransition(true)
    setTimeout(() => setCardNumber(index), 400)
    setTimeout(() => setInTransition(false), 500)
  }

  function setAdvanceCardTimeout(nextCardId: number) {
    setTimeoutId(
      window.setTimeout(() => {
        setTimeoutId(0)
        transitionToCard(nextCardId)
        setAdvanceCardTimeout(getNextCardNumber(nextCardId))
      }, CARD_ADVANCE_INTERVAL)
    )
  }

  return (
    <div className={`landing-section${inTransition ? '--in-transition' : ''} layout`}>
      <div
        className="landing-section__left-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="left-col__header">{copy.what_if}</div>
        <div className="left-col__caption">{cardsConfig[cardNumber].caption}</div>
        <div className="left-col__controls">{renderControls()}</div>
      </div>
      <div className="landing-section__right-col">
        <img className="right-col__image" {...cardsConfig[cardNumber].img} />
      </div>
    </div>
  )
}

export default LandingSection
