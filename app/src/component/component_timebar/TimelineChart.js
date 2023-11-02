import React, { useRef, useEffect, useState } from 'react';
import { LineController, LineElement, Chart, CategoryScale, LinearScale, PointElement } from 'chart.js';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement);

function TimelineChart({ data, timelinePosition, onTimelineMove }) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // ドラッグ中かどうかの状態
  const [timelineX, setTimelineX] = useState(0); // タイムラインバーのX座標

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chart) {
      chart.destroy(); // 既存のChart.jsインスタンスを破棄
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'category'
          },
          y: {
            // 他の設定
          }
        },
        plugins: {
          customLine: { // カスタムプラグインを定義
            timelineX: timelineX // タイムラインバーのX座標をプラグインに渡す
          }
        }
      }
    });
    setChart(newChart);
  }, [data, timelineX]);

  // タイムラインバーのドラッグ開始処理
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // タイムラインバーのドラッグ終了処理
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // タイムラインバーのドラッグ中処理
  const handleDrag = (event) => {
    if (isDragging) {
      const canvasRect = chartRef.current.getBoundingClientRect();
      const offsetX = event.clientX - canvasRect.left;
      setTimelineX(offsetX); // タイムラインバーのX座標を更新
      const dataIndex = chart.scales.x.getValueForPixel(offsetX);
      onTimelineMove(dataIndex);
    }
  };

  return (
    <div>
      <canvas
        ref={chartRef}
        width={400}
        height={200}
        onClick={onTimelineMove}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDrag}
      ></canvas>
      <div>
        <p>タイムライン位置: {timelinePosition}</p>
      </div>
    </div>
  );
}

export default TimelineChart;
