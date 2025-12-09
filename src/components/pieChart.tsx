import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
	labels: string[];
	data: number[];
	title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ labels, data, title }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		if (chartRef.current) {
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(canvasRef.current, {
			type: 'pie',
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: [
							'rgba(255, 99, 132, 0.8)',
							'rgba(54, 162, 235, 0.8)',
							'rgba(255, 206, 86, 0.8)',
							'rgba(75, 192, 192, 0.8)',
							'rgba(153, 102, 255, 0.8)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
					},
					title: {
						display: !!title,
						text: title,
					},
				},
			},
		});

		return () => {
			if (chartRef.current) {
				chartRef.current.destroy();
			}
		};
	}, [labels, data, title]);

	return <canvas ref={canvasRef} />;
}
