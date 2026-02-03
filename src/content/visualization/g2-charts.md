---
title: G2 统计图表示例
date: 2026-02-03
category: 数据可视化
summary: 展示如何使用 AntV G2 在 Markdown 中嵌入交互式统计图表，包括柱状图、折线图等。
---

### 1. 基础柱状图示例

通过在 Markdown 中使用 `g2` 代码块，你可以直接嵌入图表配置 JSON。

```g2
{
  "type": "interval",
  "data": [
    { "genre": "Sports", "sold": 275 },
    { "genre": "Strategy", "sold": 115 },
    { "genre": "Action", "sold": 120 },
    { "genre": "Shooter", "sold": 350 },
    { "genre": "Other", "sold": 150 }
  ],
  "encode": {
    "x": "genre",
    "y": "sold",
    "color": "genre"
  }
}
```

### 2. 折线图示例

折线图适合展示随时间变化的趋势数据。

```g2
{
  "type": "line",
  "data": [
    { "year": "1991", "value": 3 },
    { "year": "1992", "value": 4 },
    { "year": "1993", "value": 3.5 },
    { "year": "1994", "value": 5 },
    { "year": "1995", "value": 4.9 },
    { "year": "1996", "value": 6 },
    { "year": "1997", "value": 7 },
    { "year": "1998", "value": 9 },
    { "year": "1999", "value": 13 }
  ],
  "encode": {
    "x": "year",
    "y": "value"
  },
  "labels": [
    { "text": "value" }
  ]
}
```
