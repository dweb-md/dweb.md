import { useContext } from 'react'
import { Layout } from '../../../global/components'
import { GlobalContext } from '../../../global/contexts'

function ObjectivesSection() {
  const { copy } = useContext(GlobalContext)

  return (
    <Layout>
      <ul>
        <li>
          <span className="text--l">{copy.objective_one}</span>
        </li>
        <li>
          <span className="text--l">{copy.objective_two}</span>
        </li>
        <li>
          <span className="text--l">{copy.objective_three}</span>
        </li>
      </ul>
    </Layout>
  )
}

export default ObjectivesSection
