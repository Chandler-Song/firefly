import { useState, useEffect, useMemo } from 'react'
import { Github, ExternalLink, Briefcase, Calendar, ArrowRight, Box, Layers, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Tools() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  useEffect(() => {
    getModuleContent('tools')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取工具列表失败:', err)
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

  // 提取所有技术栈
  const allTechStack = useMemo(() => {
    const techs = new Set<string>()
    items.forEach(item => {
      const techStack = item.techStack as string[] | undefined
      techStack?.forEach((tech) => techs.add(tech))
    })
    return Array.from(techs)
  }, [items])

  // 过滤内容
  const filteredItems = useMemo(() => {
    if (selectedCategory === '全部') return items
    return items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  const sidebar = (
    <>
      {/* 工具分类 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Layers size={16} className="text-primary" />
          工具分类
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

      {/* 技术栈 */}
      {allTechStack.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Wrench size={16} className="text-primary" />
            技术栈
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTechStack.slice(0, 15).map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors cursor-pointer uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <Box size={14} /> 工具统计
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">工具数量</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{allTechStack.length}</div>
            <div className="text-xs text-muted-foreground">技术栈</div>
          </div>
        </div>
      </div>

      {/* 快速链接 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">快速链接</h3>
        <div className="space-y-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </>
  )

  const content = filteredItems.length === 0 ? (
    <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground bg-muted/10">
      {loading ? '加载中...' : '工欲善其事，必先利其器。工具整理中...'}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {filteredItems.map((item) => (
        <Link to={`/tools/${item.slug}`} key={item.slug} className="group">
          <div className="flex flex-col rounded-xl border border-border/50 bg-card p-5 md:p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Box className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  {item.category && (
                    <div className="text-xs text-muted-foreground mt-0.5">{item.category}</div>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3 leading-relaxed">
              {item.summary}
            </p>
            
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.techStack.slice(0, 4).map((tech: string) => (
                  <span key={tech} className="text-[10px] bg-muted px-2 py-1 rounded uppercase tracking-wider font-semibold text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} /> {item.date}
              </span>
              <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                详情 <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="工具资源库"
      description="精选开发工具与资源，提升工作效率与产品质量"
      icon={<Briefcase className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="three"
    >
      {content}
    </ModuleLayout>
  )
}
