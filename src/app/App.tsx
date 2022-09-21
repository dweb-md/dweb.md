import { useEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { copy, defaultLanguage, Language } from '../global/localization'
import { GlobalContext } from '../global/contexts'
import { LandingPage } from '../pages'
import { View } from '../global/types'

import './app.scss'

function App() {
  const [language] = useState<Language>(defaultLanguage)
  const [siteCopy, setCopy] = useState<typeof copy[Language]>(copy[language])

  const defaultView = isMobileView() ? View.mobile : View.desktop
  const [view, setView] = useState(defaultView)

  useEffect(() => {
    setCopy(copy[language])
  }, [language])

  window.addEventListener('resize', () => {
    setView(isMobileView() ? View.mobile : View.desktop)
  })

  return (
    <GlobalContext.Provider value={{ language, copy: siteCopy, view }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </GlobalContext.Provider>
  )
}

function isMobileView() {
  return window.innerWidth < 720 || window.innerHeight < 560
}

export default App
