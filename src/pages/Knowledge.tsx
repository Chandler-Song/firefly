import { useState, useEffect, useMemo } from 'react'
import { Lightbulb, Calendar, ChevronRight, Tag, FolderTree } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Knowledge() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

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
      {/* 分类筛选 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <FolderTree size={16} className="text-primary" />
          知识分类
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
          ))}        </div>
      </div>

      {/* 热门标签 */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            热门标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">知识库统计</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">知识条目</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-xs text-muted-foreground">知识分类</div>
          </div>
        </div>
      </div>
    </>
  )

  const content = filteredItems.length === 0 ? (
    <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground bg-muted/10">
      {loading ? '加载中...' : '内容整理中，敬请期待...'}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {filteredItems.map((item) => (
        <Link to={`/knowledge/${item.slug}`} key={item.slug} className="group">
          <div className="p-5 md:p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="flex-1">
              <div className="text-xs font-bold text-primary mb-3 uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-md w-fit">
                {item.category || '未分类'}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {item.summary}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} /> {item.date}
              </span>
              <span className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                查看详情 <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="知识分享"
      description="系统化的知识体系，涵盖技术深度与广度，助力持续学习与成长"
      icon={<Lightbulb className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="two"
    >
      {content}
    </ModuleLayout>
  )
}
