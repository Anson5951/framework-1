import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { scheduler } from "../core/ChartScheduler";

export function GaugeChart({
	chartId,
	bufferRef,
	interval,
	visible
}: {
	chartId: string;
	bufferRef: React.RefObject<{ value: number } | null>;
	interval: number;
	visible: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		chartRef.current = new Chart(canvasRef.current, {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [0, 100],
						borderWidth: 0
					}
				]
			},
			options: {
				animation: false,
				responsive: true,
				maintainAspectRatio: false, // 🔥 關鍵 1：不要用預設比例
				rotation: -90,
				circumference: 180,
				cutout: "70%"
			}
		});

		scheduler.register(chartId, interval, () => {
			if (!chartRef.current) return;
			const v = bufferRef.current?.value ?? 0;
			chartRef.current.data.datasets[0].data = [v, 100 - v];
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
				height: "100%", // 🔥 關鍵 2：填滿 slot
				position: "relative"
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					width: "100%",   // 🔥 關鍵 3：CSS 控制大小
					height: "100%"
				}}
			/>
		</div>
	);
}
