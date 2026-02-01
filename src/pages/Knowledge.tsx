import { Lightbulb } from 'lucide-react'

const tips = [
  { id: '1', title: '使用 tailwind-merge 解决样式冲突', category: 'CSS', date: '2026-01-30' },
  { id: '2', title: 'React 18 中的并发模式解析', category: 'React', date: '2026-01-25' },
  { id: '3', title: '如何编写可维护的 TypeScript 类型', category: 'TS', date: '2026-01-15' },
]

export default function Knowledge() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Lightbulb className="text-primary" /> 知识分享
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.id} className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors">
            <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">{tip.category}</div>
            <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
            <div className="text-sm text-muted-foreground">{tip.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
