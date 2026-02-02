---
title: "使用 tailwind-merge 解决样式冲突"
date: "2026-01-30"
category: "CSS"
summary: "在 React 组件中动态组合 Tailwind 类名时，如何优雅地处理冲突问题。"
---

# 使用 tailwind-merge 解决样式冲突

在构建可复用的 React 组件时，我们经常需要允许外部传入额外的类名。

```tsx
const Button = ({ className }) => {
  return <button className={`px-4 py-2 bg-blue-500 ${className}`}>Click me</button>
}
```

如果外部传入 `bg-red-500`，由于 CSS 样式的层叠性（Cascade），最终可能还是显示蓝色。`tailwind-merge` 可以完美解决这个问题。

## 安装

```bash
npm i tailwind-merge
```

## 使用

```ts
import { twMerge } from 'tailwind-merge'

twMerge('px-4 py-2 bg-blue-500', 'bg-red-500')
// -> 'px-4 py-2 bg-red-500'
```
