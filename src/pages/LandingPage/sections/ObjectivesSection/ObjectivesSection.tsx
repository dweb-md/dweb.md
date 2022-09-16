import { useContext } from 'react'
import { Layout } from '../../../../global/components'
import { GlobalContext } from '../../../../global/contexts'

import './objectives_section.scss'

function ObjectivesSection() {
  const { copy } = useContext(GlobalContext)

  return (
    <Layout>
      <div className="objectives-section">
        <div className="objective">
          <div className="objective__bullet">1</div>
          <div className="objective__text">{copy.objective_one}</div>
        </div>
        <div className="objective--right">
          <div className="objective__text">{copy.objective_two}</div>
          <div className="objective__bullet">2</div>
        </div>
        <div className="objective">
          <div className="objective__bullet">3</div>
          <div className="objective__text">{copy.objective_three}</div>
        </div>
      </div>
    </Layout>
  )
}

export default ObjectivesSection
