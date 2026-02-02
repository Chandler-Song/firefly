import { useState, useEffect } from 'react'
import { Lightbulb, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Knowledge() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('knowledge')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取知识列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Lightbulb className="text-primary" /> 知识分享
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            内容整理中，敬请期待...
          </div>
        ) : (
          items.map((item) => (
            <Link to={`/knowledge/${item.slug}`} key={item.slug} className="group">
              <div className="p-6 rounded-xl border bg-card hover:border-primary/50 hover:bg-accent transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-primary mb-3 uppercase tracking-widest bg-primary/5 px-2 py-1 rounded w-fit">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {item.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</span>
                  <span className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    查看详情 <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
