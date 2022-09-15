import { createContext } from 'react'
import { copy, Language } from '../localization'
import { View } from '../types'

const defaultGlobalContext = {
  language: Language.ro,
  copy: copy.ro,
  view: View.desktop
}

const GlobalContext = createContext(defaultGlobalContext)

export { GlobalContext, defaultGlobalContext }
