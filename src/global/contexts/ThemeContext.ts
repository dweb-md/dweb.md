import { createContext } from 'react'

const defaultThemeContext = { darkTheme: false }

const ThemeContext = createContext(defaultThemeContext)

export { ThemeContext, defaultThemeContext }
