import { useContext } from 'react'
import { Icon } from '../../../../global/components'
import { GlobalContext } from '../../../../global/contexts'
import './subscribe_section.scss'

const DISCORD_INVITE_LINK = 'https://discord.gg/7cCtefKy'

function SubscribeSection() {
  const { copy } = useContext(GlobalContext)

  return (
    <div className="subscribe-section layout">
      <div className="subscribe-section__title">{copy.dweb_is_in_development}</div>
      <div className="subscribe-section__subtitle">{copy.call_to_subscription}</div>
      <div className="subscribe-section__social">
        <div className="social-link" onClick={() => window.open(DISCORD_INVITE_LINK)}>
          <Icon variant="discord" />
        </div>
      </div>
    </div>
  )
}

export default SubscribeSection
