import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { scheduler } from "../test/chartScheduler";

export function GaugeChart({ chartId, bufferRef, interval, visible }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current!, {
      type: "doughnut",
      data: { datasets: [{ data: [0, 100] }] },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: "70%",
        animation: false
      }
    });

    scheduler.register(chartId, interval, () => {
      const v = bufferRef.current?.value ?? 0;
      chartRef.current!.data.datasets[0].data = [v, 100 - v];
      chartRef.current!.update("none");
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <canvas ref={canvasRef} height={240} />
    </div>
  );
}
