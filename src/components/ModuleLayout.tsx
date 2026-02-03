import React from 'react'
import { Skeleton } from './ui/skeleton'

interface ModuleLayoutProps {
  title: string
  description: string
  icon?: React.ReactNode
  sidebar: React.ReactNode
  children: React.ReactNode
  isLoading?: boolean
  gridCols?: 'one' | 'two' | 'three' | 'four'
}

export default function ModuleLayout({
  title,
  description,
  icon,
  sidebar,
  children,
  isLoading = false,
  gridCols = 'two'
}: ModuleLayoutProps) {
  
  const getGridClass = () => {
    switch (gridCols) {
      case 'one':
        return 'grid-cols-1'
      case 'two':
        return 'grid-cols-1 sm:grid-cols-2'
      case 'three':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 'four':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default:
        return 'grid-cols-1 sm:grid-cols-2'
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
      {/* 头部区域 */}
      <header className="mb-8 md:mb-12 space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight flex items-center gap-3">
          {icon}
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {description}
        </p>
        <div className="h-1 w-16 md:w-20 bg-primary rounded-full" />
      </header>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
        {/* 左侧分栏：导航/筛选区域 */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            {sidebar}
          </div>
        </aside>

        {/* 右侧分栏：内容展示区域 */}
        <main className="flex-1 min-w-0">
          {isLoading ? (
            <div className={`grid ${getGridClass()} gap-4 md:gap-6`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[280px] md:h-[320px] w-full rounded-xl" />
              ))}
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}
