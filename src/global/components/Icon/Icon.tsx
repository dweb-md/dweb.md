import './icon.scss'

type IconVariant = 'telegram'

export default function Icon({ variant }: { variant: IconVariant }) {
  return <div className={`icon--${variant}`} />
}
