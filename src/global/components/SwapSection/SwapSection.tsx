import { forwardRef, ReactNode, useContext, Ref } from 'react'
import { GlobalContext, ThemeContext } from '../../contexts'
import { View } from '../../types'
import './swap_section.scss'

type SwapSectionModifier = 'pre' | 'active' | 'post'
type SwapSectionProps = {
  children?: ReactNode
  modifier: SwapSectionModifier
  scrollClue?: ReactNode
}

const SwapSection = forwardRef<HTMLDivElement, SwapSectionProps>(function SwapSectioReffed(
  props: SwapSectionProps,
  ref?: Ref<HTMLDivElement>
) {
  const { children, modifier, scrollClue } = props

  const { view } = useContext(GlobalContext)
  const { darkTheme } = useContext(ThemeContext)

  const shouldRenderFooter = scrollClue !== undefined && view !== View.mobile
  const themeModifier = darkTheme ? 'swap-section--dark' : ''

  return (
    <div ref={ref} className={`swap-section swap-section--${modifier} ${themeModifier}`}>
      <div className="swap-section__content">{children}</div>
      {shouldRenderFooter ? (
        <div className="swap-section__footer">
          <div className="footer__caption text--s">{scrollClue}</div>
          <div className="footer__icon">↓</div>
        </div>
      ) : null}
    </div>
  )
})

export default SwapSection
