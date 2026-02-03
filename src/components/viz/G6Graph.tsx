import React, { useEffect, useRef } from 'react';
import { Graph, register } from '@antv/g6';
import { DragElement, ZoomCanvas, DragCanvas, CollapseExpand, ClickSelect, HoverActivate } from '@antv/g6';
import { CompactBoxLayout, ForceLayout, DagreLayout, CircularLayout, RadialLayout, GridLayout } from '@antv/g6';
import { Circle, Rect, Polyline, Line, Cubic, CubicHorizontal, CubicVertical } from '@antv/g6';

// 注册插件以支持 G6 v5 的模块化机制
register('behavior', 'drag-element', DragElement);
register('behavior', 'drag-node', DragElement); // 兼容 drag-node 命名
register('behavior', 'zoom-canvas', ZoomCanvas);
register('behavior', 'drag-canvas', DragCanvas);
register('behavior', 'collapse-expand', CollapseExpand);
register('behavior', 'click-select', ClickSelect);
register('behavior', 'hover-activate', HoverActivate);

register('layout', 'compactBox', CompactBoxLayout as any);
register('layout', 'force', ForceLayout);
register('layout', 'dagre', DagreLayout);
register('layout', 'circular', CircularLayout);
register('layout', 'radial', RadialLayout);
register('layout', 'grid', GridLayout);

register('node', 'circle', Circle);
register('node', 'rect', Rect);
register('edge', 'polyline', Polyline);
register('edge', 'line', Line);
register('edge', 'cubic', Cubic);
register('edge', 'cubic-horizontal', CubicHorizontal);
register('edge', 'cubic-vertical', CubicVertical);

interface G6GraphProps {
  config: string;
}

const G6Graph: React.FC<G6GraphProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      if (containerRef.current && graphRef.current && !graphRef.current.destroyed) {
        try {
          graphRef.current.setSize(containerRef.current.scrollWidth, 500);
        } catch (e) {
          console.warn('G6 resize failed:', e);
        }
      }
    };

    try {
      const options = JSON.parse(config);
      
      if (graphRef.current) {
        graphRef.current.destroy();
      }

      const graph = new Graph({
        container: containerRef.current,
        width: containerRef.current.scrollWidth || 800,
        height: 500,
        layout: {
          type: 'force',
          preventOverlap: true,
        },
        ...options,
      });

      if (options.data) {
        graph.setData(options.data);
      }
      
      // 异步渲染防护：捕获可能由于组件卸载导致的“已销毁”错误
      graph.render().catch(err => {
        if (!err.message?.includes('destroyed')) {
          console.error('G6 Render Error:', err);
        }
      });
      
      graphRef.current = graph;

      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.error('G6 Graph parsing error:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div class="text-destructive p-4">图可视化配置解析错误: ${error}</div>`;
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (graphRef.current) {
        if (!graphRef.current.destroyed) {
          graphRef.current.destroy();
        }
        graphRef.current = null;
      }
    };
  }, [config]);

  return <div ref={containerRef} className="my-8 border rounded-xl bg-card shadow-sm overflow-hidden min-h-[500px]" />;
};

export default G6Graph;
