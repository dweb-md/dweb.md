import Image from 'next/image'
import Link from 'next/link'

type FooterProps = {
  joinLink: string
}

export default function Footer({ joinLink }: FooterProps) {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer__left">
          <Image
            src="/uncle_sam.png"
            alt="Uncle Sam"
            width={1271}
            height={1708}
          />
        </div>
        <div className="footer__right">
          <div className="footer__title">Dweb.md are nevoie de TINE</div>
          <div className="footer__body">
            <p>
              Participă în discuții, fă schimb de experiență, contribuie la
              adoptarea DWeb-ului la noi în țară - totul pe Discordul
              comunității.
            </p>
          </div>
          <Link
            href={joinLink}
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Alătură-te pe Discord
          </Link>
        </div>
      </div>
    </footer>
  )
}
