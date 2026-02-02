import { useState, useEffect } from 'react'
import { StickyNote, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Notes() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('notes')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取笔记列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <StickyNote className="text-primary" /> 随手笔记
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            记点什么吧...
          </div>
        ) : (
          items.map((item) => (
            <Link to={`/notes/${item.slug}`} key={item.slug} className="group">
              <div className="p-6 rounded-xl border bg-yellow-50/30 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-700/30 hover:shadow-lg transition-all h-full transform hover:-rotate-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
                    {item.category || 'Note'}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Calendar size={10} /> {item.date}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">
                  {item.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-yellow-200/30 dark:border-yellow-700/20 flex justify-end">
                  <ChevronRight size={16} className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
