import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface G2ChartProps {
  config: string;
}

const G2Chart: React.FC<G2ChartProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const options = JSON.parse(config);
      
      // 清除旧实例
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
        height: 400,
      });

      chart.options(options);
      chart.render();
      chartRef.current = chart;
    } catch (error) {
      console.error('G2 Chart parsing error:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div class="text-destructive p-4">图表配置解析错误: ${error}</div>`;
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config]);

  return <div ref={containerRef} className="my-8 p-4 border rounded-xl bg-card shadow-sm overflow-hidden" />;
};

export default G2Chart;
