import { useState } from 'react'
import './image_loader.scss'

export default function Loader({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true)

  function onLoadHandler() {
    setLoading(false)
  }

  return (
    <div className={loading ? 'loader--active' : 'loader'}>
      <img src={src} alt={alt} onLoad={onLoadHandler} />
    </div>
  )
}
