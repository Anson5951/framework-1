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
				parsing: false,
				normalized: true,
				scales: {
					x: {
						type: "linear",
						ticks: { display: false }
					},
					y: {
						beginAtZero: true
					}
				}
			}
		});

		scheduler.register(chartId, interval, () => {
			// 🔒 防禦：chart 尚未建立時不 render
			if (!chartRef.current) return;

			chartRef.current.data.datasets[0].data = bufferRef.current;
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
				height: "100%"
			}}
		>
			{chartId}
			<canvas ref={canvasRef} height={240} />
		</div>
	);
}
