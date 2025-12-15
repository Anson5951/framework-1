import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import type { BarLineChartWidget, ThemeConfig } from '../config/dashboardSchema';

interface Props {
	widget: BarLineChartWidget;
	theme?: ThemeConfig;
}

export default function BarLineChart({ widget, theme }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const existing = Chart.getChart(canvas);
		if (existing) existing.destroy();

		if (chartRef.current) {
			chartRef.current.destroy();
			chartRef.current = null;
		}

		chartRef.current = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: widget.chart.labels,
				datasets: widget.chart.datasets.map(ds => ({
					...ds,
					backgroundColor:
						ds.type === 'bar'
							? ds.color ?? widget.style?.colors?.bar ?? theme?.chartColors?.bar
							: undefined,
					borderColor:
						ds.type === 'line'
							? ds.color ?? widget.style?.colors?.line ?? theme?.chartColors?.line
							: undefined
				}))
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: { display: true, text: widget.title },
					legend: { display: true }
				}
			}
		});

		return () => {
			const chart = Chart.getChart(canvas);
			if (chart) chart.destroy();
			chartRef.current = null;
		};
	}, [widget, theme]);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={canvasRef} />
		</div>
	);
}
