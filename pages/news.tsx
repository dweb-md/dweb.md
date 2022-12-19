import { GetServerSidePropsContext } from 'next'
import fs from 'fs'
import Header from '../components/header'
import ArticleLayout from '../components/article'
import Footer from '../components/footer'
import GlobalHead from './head'

type NewsPageProps = {
  content: string
  joinLink: string
}

export default function News(props: NewsPageProps) {
  return (
    <>
      <GlobalHead title="Dweb.md | Noutăți" />
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
): Promise<{ props: NewsPageProps }> {
  const content = fs.readFileSync('./articles/ro/news.html').toString()
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
