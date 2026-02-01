import { TrendingUp, BarChart } from 'lucide-react'

export default function Insights() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <TrendingUp className="text-primary" /> 行业洞察
      </h1>
      
      <div className="grid gap-8">
        <div className="p-8 rounded-2xl border bg-gradient-to-br from-background to-muted">
          <div className="flex items-center gap-2 text-primary font-semibold mb-4 text-sm uppercase">
            <BarChart size={18} /> 2026 Q1 前端趋势报告
          </div>
          <h2 className="text-2xl font-bold mb-4">AI 驱动的开发范式正在重塑前端生态</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            随着 LLM 的普及，前端开发已从单纯的 UI 构建转向更复杂的逻辑编排。
            Serverless 架构与 Edge Computing 的结合让应用性能达到了新高度...
          </p>
          <div className="flex gap-4">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">#AI</span>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">#EdgeComputing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
