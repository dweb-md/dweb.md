import Head from 'next/head'

const copy = {
  description:
    'dweb.md - proiect pentru dezvoltarea și adoptarea Web-ului Descentralizat în Republica Moldova.',
  url: 'https:/dweb.md',
  siteName: 'dweb.md',
  title: 'dweb.md',
  keywords: 'web3, dweb, Internet, descentralizare, comunitate',
}

export default function GlobalHead({
  title = copy.title,
  description = copy.description,
}: {
  title?: string
  description?: string
}) {
  return (
    <Head>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="description" content={description} />
      <meta name="keywords" content={copy.keywords} />

      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:url" content={copy.url} />
      <meta property="og:image" content={`${copy.url}/favicon-192x192.png`} />
      <meta property="og:site_name" content={copy.siteName} />
      <meta property="og:type" content="website" />

      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        href="/images/favicon-192x192.png"
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon-180x180.png"
      />
    </Head>
  )
}
