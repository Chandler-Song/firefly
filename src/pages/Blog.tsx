import { useState, useEffect } from 'react'
import { Calendar, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('blog')
      .then(data => {
        setPosts(data)
      })
      .catch(err => {
        console.error('获取博客列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10">博客文章</h1>
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="p-12 text-center border rounded-xl bg-card/50 text-muted-foreground">
            期待第一篇博文...
          </div>
        ) : (
          posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="block group">
              <article className="p-8 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                    <div className="flex gap-2">
                      {post.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    阅读全文 <span>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
