import { useEffect, useRef } from 'react';
import {
	Chart,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Tooltip,
	Legend
} from 'chart.js';
import type { BarLineChartWidget } from '../config/dashboardSchema';

Chart.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Tooltip,
	Legend
);

interface Props {
	data: BarLineChartWidget;
}

export default function BarLineChart({ data }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		// 🔴 每次 snapshot 來，直接銷毀舊 chart
		if (chartRef.current) {
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(canvasRef.current, {
			type: 'bar', // base type
			data: {
				labels: data.labels,
				datasets: data.datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: true },
					title: {
						display: true,
						text: data.title
					}
				}
			}
		});

		// ✅ cleanup（你之前問題的解藥）
		return () => {
			chartRef.current?.destroy();
			chartRef.current = null;
		};
	}, [data]); // 👈 snapshot 改 → 整張 chart 重建

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={canvasRef} />
		</div>
	);
}
