import { copy } from '../../../../global/localization'

const CARDS_COUNT = 5
const CARD_ADVANCE_INTERVAL = 6000 // 6s

function generateCardsConfig(localization: typeof copy.ro) {
  return [
    {
      caption: localization.hypothesis_one,
      img: { src: '/img/landing_power_to_the_peers.svg', alt: 'power to the peers' }
    },
    {
      caption: localization.hypothesis_two,
      img: { src: '/img/landing_comp_econ.svg', alt: 'native economic component' }
    },
    {
      caption: localization.hypothesis_three,
      img: { src: '/img/landing_sec_n_privacy.svg', alt: 'security and privacy by default' }
    },
    {
      caption: localization.hypothesis_four,
      img: {
        src: '/img/landing_single_point_of_failure.svg',
        alt: 'no more single point of failure'
      }
    },
    {
      caption: localization.hypothesis_five,
      img: { src: '/img/landing_transparency.svg', alt: 'transparent web services' }
    }
  ]
}

function getNextCardNumber(num: number) {
  return (num + 1) % CARDS_COUNT
}

export { generateCardsConfig, getNextCardNumber, CARDS_COUNT, CARD_ADVANCE_INTERVAL }
