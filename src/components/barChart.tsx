import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { BarChartProps } from '@/types/BarChartProps';


const BarChart: React.FC<BarChartProps> = ({ labels, datasets, title = 'Chart' }) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			chartInstance.current = new Chart(chartRef.current, {
				type: 'bar',
				data: {
					labels,
					datasets,
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Monthly Sales',
						},
					},
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [labels, datasets, title]);

	return <canvas ref={chartRef} />;
};

export default BarChart;
