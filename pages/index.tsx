import { GetServerSidePropsContext } from 'next'
import fs from 'fs'
import ArticleLayout from '../components/article'
import Header from '../components/header'
import Footer from '../components/footer'
import GlobalHead from './head'

type HomePageProps = {
  content: string
  joinLink: string
}

export default function Home(props: HomePageProps) {
  return (
    <>
      <GlobalHead title="Dweb.md | Acasă" />

      <Header joinLink={props.joinLink} />
      <div className="page-layout">
        <ArticleLayout content={props.content} />
        <Footer joinLink={props.joinLink} />
      </div>
    </>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: HomePageProps }> {
  const content = fs.readFileSync('./articles/ro/home.html').toString()
  const { joinLink } = JSON.parse(
    fs.readFileSync('./config/config.json').toString()
  )

  return {
    props: {
      content,
      joinLink,
    },
  }
}
