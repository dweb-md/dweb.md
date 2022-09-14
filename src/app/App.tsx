import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { copy, defaultLanguage, Language } from '../global/localization'
import { GlobalContext } from '../global/contexts'
import { LandingPage } from '../pages'

import './app.scss'

function App() {
  const [language] = useState<Language>(defaultLanguage)
  const [siteCopy, setCopy] = useState<typeof copy[Language]>(copy[language])

  useEffect(() => {
    setCopy(copy[language])
  }, [language])

  return (
    <GlobalContext.Provider value={{ language, copy: siteCopy }}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </HashRouter>
    </GlobalContext.Provider>
  )
}

export default App
