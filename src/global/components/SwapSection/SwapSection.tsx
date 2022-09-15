import { ReactNode, useContext } from 'react'
import { GlobalContext } from '../../contexts'
import { View } from '../../types'
import './swap_section.scss'

type SwapSectionModifier = 'pre' | 'active' | 'post'

function SwapSection({
  children,
  modifier,
  scrollClue
}: {
  children?: ReactNode
  modifier: SwapSectionModifier
  scrollClue?: ReactNode
}) {
  const { view } = useContext(GlobalContext)

  const shouldRenderFooter = scrollClue !== undefined && view !== View.mobile

  return (
    <div className={`swap-section swap-section--${modifier}`}>
      <div className="swap-section__content">{children}</div>
      {shouldRenderFooter ? (
        <div className="swap-section__footer">
          <div className="footer__caption text--s">{scrollClue}</div>
          <div className="footer__icon">↓</div>
        </div>
      ) : null}
    </div>
  )
}

export default SwapSection
