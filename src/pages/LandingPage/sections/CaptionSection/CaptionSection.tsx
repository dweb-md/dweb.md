import { ReactNode } from 'react'
import { Layout } from '../../../../global/components'

import './caption_section.scss'

function CaptionSection({ children }: { children?: ReactNode }) {
  return (
    <Layout>
      <div className="caption">{children}</div>
    </Layout>
  )
}

export default CaptionSection
