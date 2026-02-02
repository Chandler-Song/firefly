---
title: "React 18 性能优化实战"
date: "2026-02-01"
tags: ["React", "Performance"]
summary: "探讨并发模式（Concurrent Mode）和 Transition API 如何提升用户体验。"
---

# React 18 性能优化实战

React 18 引入了许多强大的特性，其中最引人注目的是并发渲染。

## useTransition

通过 `useTransition`，我们可以将某些更新标记为“非紧急”，从而避免阻塞 UI 交互。

```tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(value);
});
```

这对于耗时的搜索列表过滤非常有用。
