import { useState } from 'react'
import { Calendar, Tag } from 'lucide-react'

const mockPosts = [
  {
    slug: 'first-post',
    title: '基于 React + Vite 的现代主页构建指南',
    date: '2026-02-01',
    tags: ['React', 'Vite', '前端架构'],
    summary: '探讨如何构建一个高效、模块化的个人门户网站。'
  },
  {
    slug: 'performance-tips',
    title: 'React 性能优化实战技巧',
    date: '2026-01-20',
    tags: ['React', 'Performance'],
    summary: '从渲染机制出发，深入浅出讲解性能优化方案。'
  }
]

export default function Blog() {
  const [posts] = useState(mockPosts)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">博客文章</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group p-6 rounded-xl border bg-card hover:border-primary transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.summary}
              </p>
              <button className="text-primary font-medium text-sm flex items-center gap-1 group-hover:underline">
                阅读更多 →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
