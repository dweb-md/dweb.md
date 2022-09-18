import './icon.scss'

type IconVariant = 'telegram' | 'discord'

export default function Icon({ variant }: { variant: IconVariant }) {
  return <div className={`icon--${variant}`} />
}
