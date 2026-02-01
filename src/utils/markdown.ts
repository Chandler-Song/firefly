import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string
}

export function parseMarkdown(mdContent: string, slug: string): Post {
  const { data, content } = matter(mdContent)
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    tags: data.tags || [],
    content,
  }
}
