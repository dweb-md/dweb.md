type HeadingProperties = {
  order: number
  caption: string
}

export function extractSectionsFromHtml(html: string): HeadingProperties[] {
  const matchingTitles = extractHeadingsFromHtml(html)

  return matchingTitles.map(extractHeadingProperties)
}

/**
 * Supports only headings that span no more than 4 lines
 *
 * @bug doesn't work if one heading follows another
 */
export function extractHeadingsFromHtml(html: string): string[] {
  return (
    html.match(
      /(<h[1-6]( \w*=?"?[\w-]*"?)*>(\n?( ){0,2}.*\n?){0,2}<\/h[1-6]>)/g
    ) || []
  )
}

export function extractHeadingProperties(title: string): HeadingProperties {
  const pattern = new RegExp(/<h([1-6])>((.|\s)*)<\/h[1-6]>/)
  const patternMatch = pattern.exec(title) || [, '1', '']

  const order = parseInt(patternMatch[1])
  const caption = patternMatch[2].trim().replaceAll(/\s+/g, ' ')

  return { order, caption }
}

export function addIdsToHeadings(html: string): string {
  const headings = Array.from(extractHeadingsFromHtml(html))

  return headings.reduce(injectHeadingId, html)
}

export function injectHeadingId(html: string, heading: string): string {
  const startAt = html.indexOf(heading)
  const { caption } = extractHeadingProperties(heading)
  const id = generateId(caption)

  return html.slice(0, startAt + 3) + ` id="${id}"` + html.slice(startAt + 3)
}

export function generateId(caption: string): string {
  return caption
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll(/[?.,;]/g, '')
}
