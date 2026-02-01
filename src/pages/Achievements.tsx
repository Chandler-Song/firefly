import { Award, CheckCircle } from 'lucide-react'

const achievements = [
  { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2025' },
  { title: '优秀员工奖', issuer: '某互联网公司', date: '2024' },
  { title: '开源贡献者', issuer: 'React 社区', date: '2023 - 至今' },
]

export default function Achievements() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Award className="text-primary" /> 荣誉成就
      </h1>
      <div className="relative border-l-2 border-muted ml-4 pl-8 space-y-12">
        {achievements.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[41px] top-0 bg-background p-1">
              <CheckCircle className="text-primary" size={24} />
            </div>
            <div className="p-6 rounded-xl border bg-card hover:border-primary transition-all">
              <span className="text-sm text-primary font-bold uppercase tracking-widest">{item.date}</span>
              <h3 className="text-xl font-bold mt-2 mb-1">{item.title}</h3>
              <p className="text-muted-foreground">{item.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
