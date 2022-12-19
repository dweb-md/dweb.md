import { GetServerSidePropsContext } from 'next'
import fs from 'fs'
import Header from '../components/header'
import GlobalHead from './head'

type ResourcesPageProps = {
  content: string
  joinLink: string
}

export default function Resources(props: ResourcesPageProps) {
  return (
    <>
      <GlobalHead title="Dweb.md | Resurse" />
      <Header joinLink={props.joinLink} />
      <div className="page-layout">
        <main className="container mx-auto pt-40 text-center font-2xl font-bold text-sky-900">
          În curând...
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: ResourcesPageProps }> {
  const { joinLink } = JSON.parse(
    fs.readFileSync('./config/config.json').toString()
  )

  return {
    props: {
      content: '',
      joinLink,
    },
  }
}
