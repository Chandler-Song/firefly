import socialLinks from '../data/social.json'
import * as Icons from 'lucide-react'

export default function Social() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">连接与交流</h1>
      <p className="text-muted-foreground mb-12">你可以在以下平台找到我，欢迎随时交流！</p>
      
      <div className="grid grid-cols-1 gap-4">
        {socialLinks.map((link) => {
          const Icon = (Icons as any)[link.icon] || Icons.Link
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-xl font-semibold">{link.platform}</span>
              </div>
              <Icons.ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
            </a>
          )
        })}
      </div>
    </div>
  )
}
