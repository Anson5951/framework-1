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
import type { BarLineChartData } from '@/types/DashboardSchema';

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
	data: BarLineChartData;
}

export default function BarLineChart({ data }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

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

		return () => {
			chartRef.current?.destroy();
			chartRef.current = null;
		};
	}, [data]);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={canvasRef} />
		</div>
	);
}
