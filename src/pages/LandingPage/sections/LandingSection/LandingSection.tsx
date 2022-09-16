import { useContext, useState } from 'react'
import { GlobalContext } from '../../../../global/contexts'

import './landing_section.scss'

function LandingSection() {
  const { copy } = useContext(GlobalContext)
  const [inTransition, setInTransition] = useState(false)
  const [cardNumber, setCardNumber] = useState(0)

  const cardsConfig = [
    {
      caption: copy.hypothesis_one,
      img: { src: '/img/power_to_the_peers.svg', alt: 'power to the peers' }
    },
    {
      caption: copy.hypothesis_two,
      img: { src: '/img/power_to_the_peers.svg', alt: 'power to the peers' }
    },
    {
      caption: copy.hypothesis_three,
      img: { src: '/img/power_to_the_peers.svg', alt: 'power to the peers' }
    },
    {
      caption: copy.hypothesis_four,
      img: { src: '/img/power_to_the_peers.svg', alt: 'power to the peers' }
    },
    {
      caption: copy.hypothesis_five,
      img: { src: '/img/power_to_the_peers.svg', alt: 'power to the peers' }
    }
  ]

  function transitionToCard(index: number) {
    setInTransition(true)
    setTimeout(() => setCardNumber(index), 400)
    setTimeout(() => setInTransition(false), 500)
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

  return (
    <div className={`landing-section${inTransition ? '--in-transition' : ''} layout`}>
      <div className="landing-section__left-col">
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
