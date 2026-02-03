import { useState, useEffect } from 'react'
import { BarChart3, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Visualization() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('visualization')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取可视化列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center animate-pulse">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <BarChart3 className="text-primary" /> 图表可视化
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            探索数据之美...
          </div>
        ) : (
          items.map((item) => (
            <Link to={`/visualization/${item.slug}`} key={item.slug} className="group">
              <article className="p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                    {item.category || 'Visualization'}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} /> {item.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                  {item.summary}
                </p>
                <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  查看演示 <ChevronRight size={16} />
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
