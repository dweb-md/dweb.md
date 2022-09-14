import { createContext } from 'react'
import { copy, Language } from '../localization'

const defaultGlobalContext = {
  language: Language.ro,
  copy: copy.ro
}

const GlobalContext = createContext(defaultGlobalContext)

export { GlobalContext, defaultGlobalContext }
