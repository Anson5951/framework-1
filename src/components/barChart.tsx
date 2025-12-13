import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { scheduler } from "../test/chartScheduler";

export function BarChart({
	chartId,
	bufferRef,
	interval,
	visible
}: {
	chartId: string;
	bufferRef: React.RefObject<{
		categories: string[];
		values: number[];
	} | null>;
	interval: number;
	visible: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		chartRef.current = new Chart(canvasRef.current, {
			type: "bar",
			data: {
				labels: [],
				datasets: [
					{
						data: [],
						borderWidth: 0
					}
				]
			},
			options: {
				animation: false,
				responsive: true,
				maintainAspectRatio: false, // 🔥 關鍵：不要讓 Chart.js 自己決定高度
				scales: {
					x: {
						ticks: {
							autoSkip: true,
							maxRotation: 0
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
			const d = bufferRef.current;
			if (!d) return;

			chartRef.current.data.labels = d.categories;
			chartRef.current.data.datasets[0].data = d.values;
			chartRef.current.update("none");
		});

		return () => {
			chartRef.current?.destroy();
			chartRef.current = null;
		};
	}, []);

	return (
		<div
			style={{
				display: visible ? "block" : "none",
				width: "100%",
				height: "100%", // 🔥 填滿 slot
				position: "relative"
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					width: "100%",
					height: "100%"
				}}
			/>
		</div>
	);
}
