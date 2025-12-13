import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { scheduler } from "../test/chartScheduler";

export function LineChart({
	chartId,
	bufferRef,
	interval,
	visible
}: {
	chartId: string;
	bufferRef: React.MutableRefObject<Array<{ x: number; y: number }>>;
	interval: number;
	visible: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		chartRef.current = new Chart(canvasRef.current, {
			type: "line",
			data: {
				datasets: [
					{
						label: chartId,
						data: [],
						borderWidth: 2,
						pointRadius: 0
					}
				]
			},
			options: {
				animation: false,
				parsing: false, // 🔥 關鍵 1：告訴 Chart.js 不要自動解析
				normalized: true,
				scales: {
					x: {
						type: "linear", // 🔥 關鍵 2：x 是數值（timestamp）
						ticks: {
							display: false
						}
					},
					y: {
						beginAtZero: true
					}
				}
			}
		});

		scheduler.register(chartId, interval, () => {
			if (!chartRef.current) return;
			chartRef.current.data.datasets[0].data = bufferRef.current;
			chartRef.current.update("none");
		});

		return () => {
			chartRef.current?.destroy();
		};
	}, []);

	if (!visible) return null;

	return <canvas ref={canvasRef} height={240} />;
}
