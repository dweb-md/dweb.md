import Article from './article'
import ArticleAside from './aside'
import { addIdsToHeadings, extractSectionsFromHtml } from '../../common/utils'

function ArticleLayout({ content }: { content: string }) {
  const sections = extractSectionsFromHtml(content)
  const contentWithHeadingIds = addIdsToHeadings(content)

  return (
    <main className="article-layout">
      <ArticleAside sections={sections} />
      <Article content={contentWithHeadingIds} />
    </main>
  )
}

export default ArticleLayout
