import { useState, useEffect } from 'react'
import { TrendingUp, BarChart, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Insights() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('insights')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取洞察列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <TrendingUp className="text-primary" /> 行业洞察
      </h1>
      
      <div className="grid gap-8">
        {items.length === 0 ? (
          <div className="p-8 rounded-2xl border bg-gradient-to-br from-background to-muted text-center text-muted-foreground">
            思考中... 稍后发布。
          </div>
        ) : (
          items.map((item) => (
            <Link to={`/insights/${item.slug}`} key={item.slug} className="block group">
              <div className="p-8 rounded-2xl border bg-gradient-to-br from-background to-muted group-hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase">
                    <BarChart size={18} /> {item.category || '趋势报告'}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Calendar size={12} /> {item.date}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  阅读全文 <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
