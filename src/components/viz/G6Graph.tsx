import React, { useEffect, useRef } from 'react';
import G6, { Graph } from '@antv/g6';

interface G6GraphProps {
  config: string;
}

const G6Graph: React.FC<G6GraphProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const options = JSON.parse(config);
      
      if (graphRef.current) {
        graphRef.current.destroy();
      }

      const graph = new G6.Graph({
        container: containerRef.current,
        width: containerRef.current.scrollWidth || 800,
        height: 500,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        layout: {
          type: 'force',
          preventOverlap: true,
        },
        defaultNode: {
          size: 30,
          style: {
            fill: '#91d5ff',
            stroke: '#40a9ff',
          },
        },
        ...options,
      });

      graph.data(options.data || { nodes: [], edges: [] });
      graph.render();
      graphRef.current = graph;

      const handleResize = () => {
        if (containerRef.current && graphRef.current) {
          graphRef.current.changeSize(containerRef.current.scrollWidth, 500);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.error('G6 Graph parsing error:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div class="text-destructive p-4">图可视化配置解析错误: ${error}</div>`;
      }
    }

    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
    };
  }, [config]);

  return <div ref={containerRef} className="my-8 border rounded-xl bg-card shadow-sm overflow-hidden min-h-[500px]" />;
};

export default G6Graph;
