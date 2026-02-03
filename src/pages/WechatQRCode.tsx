import { QrCode, MessageSquare } from 'lucide-react'

export default function WechatQRCode() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
          <MessageSquare size={16} />
          <span>微信联系</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">微信二维码</h1>
        <p className="text-muted-foreground text-lg">
          扫码添加 Chandler 的微信，欢迎交流技术与合作
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* 二维码展示区域 */}
        <div className="relative bg-card border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-white p-4 rounded-xl inline-block">
            <img
              src={`${import.meta.env.BASE_URL}wechat-qrcode.png`}
              alt="Chandler 的微信二维码"
              className="w-64 h-64 md:w-72 md:h-72 object-contain"
              onError={(e) => {
                // 图片加载失败时显示占位符
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-64 h-64 md:w-72 md:h-72 flex flex-col items-center justify-center bg-muted rounded-lg">
                      <svg class="w-16 h-16 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      <p class="text-muted-foreground text-sm">二维码图片待上传</p>
                      <p class="text-muted-foreground text-xs mt-1">请将图片命名为 wechat-qrcode.png</p>
                      <p class="text-muted-foreground text-xs">并放置在 public 目录下</p>
                    </div>
                  `
                }
              }}
            />
          </div>
        </div>

        {/* 使用说明 */}
        <div className="bg-card border rounded-lg p-6 max-w-md w-full">
          <div className="flex items-start gap-3">
            <QrCode className="text-primary flex-shrink-0 mt-1" size={20} />
            <div className="text-left">
              <h3 className="font-semibold mb-2">如何添加微信</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. 打开微信扫一扫功能</li>
                <li>2. 扫描上方二维码</li>
                <li>3. 添加好友时请备注来源</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 max-w-md">
          <p>💡 建议添加好友时备注：姓名 + 来源（如：张三-GitHub）</p>
        </div>
      </div>
    </div>
  )
}
