function Article({ content }: { content: string }) {
  return <article dangerouslySetInnerHTML={{ __html: content }} />
}

export default Article
