import { MouseEventHandler, useEffect, useState } from 'react'
import { generateId } from '../../common/utils'

type SectionType = { order: number; caption: string }

type ArticleAsideProps = {
  sections: SectionType[]
}

const topOffset = 72

function ArticleAside({ sections }: ArticleAsideProps) {
  const [scrollY, setScrollY] = useState(0)
  const [newScrollY, setNewScrollY] = useState(0)
  const [scrolledUp, setScrolledUp] = useState(true)
  const [activeSection, setActiveSection] = useState(0)

  const onScroll = () => setNewScrollY(window.scrollY)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollY(newScrollY)
    setScrolledUp(scrollY > newScrollY)
  }, [newScrollY])

  useEffect(() => {
    let newActiveSection = getNewActiveSection(
      sections,
      activeSection,
      scrolledUp
    )

    if (newActiveSection !== activeSection) setActiveSection(newActiveSection)
  }, [scrollY])

  useEffect(() => {
    updateActiveSectionLink(sections, activeSection)
  }, [activeSection])

  return (
    <aside>
      <div className="aside-container">{renderTableOfContents(sections)}</div>
    </aside>
  )
}

function getNewActiveSection(
  sections: SectionType[],
  activeSection: number,
  scrolledUp: boolean
): number {
  return sections.reduce((section, { caption }, index) => {
    const id = generateId(caption)
    const header = document.getElementById(id)

    const shouldChangeActiveSection =
      (scrolledUp && index < section) || (!scrolledUp && index > section)

    if (header && isInTheViewport(header) && shouldChangeActiveSection)
      return index

    return section
  }, activeSection)
}

function renderTableOfContents(sections: SectionType[]) {
  return sections.map(({ order, caption }, index) => {
    const id = generateId(caption)
    const isActive = index === 0 ? ' active' : ''

    return (
      <a
        onClick={scrollToViewHeading(id)}
        key={`toc-${id}`}
        id={`toc-${id}`}
        className={`h${order}` + isActive}
      >
        {caption}
      </a>
    )
  })
}

function updateActiveSectionLink(
  sections: SectionType[],
  activeSection: number
) {
  sections.forEach(({ caption }, index) => {
    const id = generateId(caption)
    const link = document.getElementById('toc-' + id)

    if (!link) return

    if (index === activeSection) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

function isInTheViewport(element: HTMLElement): boolean {
  const { top, bottom } = element.getBoundingClientRect()
  return top >= topOffset && bottom <= window.innerHeight
}

function scrollToViewHeading(id: string): MouseEventHandler<HTMLAnchorElement> {
  const offset = topOffset + 64

  return () => {
    const scrollY = (document.getElementById(id)?.offsetTop || 0) - offset
    window.scrollTo(0, scrollY)
  }
}

export default ArticleAside
