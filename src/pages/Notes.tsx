import { useState, useEffect, useMemo } from 'react'
import { StickyNote, Calendar, ChevronRight, Tag, Hash, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Notes() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

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

  // 提取所有分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[]
    return ['全部', ...cats]
  }, [items])

  // 提取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    items.forEach(item => {
      item.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [items])

  // 过滤内容
  const filteredItems = useMemo(() => {
    if (selectedCategory === '全部') return items
    return items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  const sidebar = (
    <>
      {/* 笔记分类 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Hash size={16} className="text-primary" />
          笔记分类
        </h3>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat || '全部')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                ({cat === '全部' ? items.length : items.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签云 */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-yellow-50/50 dark:bg-yellow-900/10 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <BookOpen size={14} /> 笔记统计
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">笔记数量</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-xs text-muted-foreground">分类数量</div>
          </div>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="rounded-lg border border-yellow-200/50 dark:border-yellow-700/30 bg-yellow-50/30 dark:bg-yellow-900/10 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 随手记录灵感碎片，沉淀日常思考，积累点滴智慧。
        </p>
      </div>
    </>
  )

  const content = filteredItems.length === 0 ? (
    <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground bg-muted/10">
      {loading ? '加载中...' : '记点什么吧...'}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {filteredItems.map((item) => (
        <Link to={`/notes/${item.slug}`} key={item.slug} className="group">
          <div className="p-5 md:p-6 rounded-xl border border-yellow-200/50 dark:border-yellow-700/30 bg-yellow-50/30 dark:bg-yellow-900/10 hover:shadow-lg hover:shadow-yellow-500/10 hover:-rotate-1 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded">
                {item.category || 'Note'}
              </div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Calendar size={10} /> {item.date}
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed flex-grow">
              {item.summary}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-yellow-200/30 dark:border-yellow-700/20 flex justify-end">
              <ChevronRight size={16} className="text-yellow-600 dark:text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="随手笔记"
      description="记录灵感碎片，沉淀日常思考，积累点滴智慧"
      icon={<StickyNote className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="three"
    >
      {content}
    </ModuleLayout>
  )
}
