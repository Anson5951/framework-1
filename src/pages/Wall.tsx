import React, { useEffect, useMemo, useState } from 'react';
import { BarChart } from '../components/barChart';

const localChartDataList = [
	{
		labels: ['2024-January', '2024-February', '2024-March', '2024-April'],
		datasets: [
			{
				label: 'Revenue',
				data: [12, 19, 3, 5],
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	},
	{
		labels: ['2024-May', '2024-June', '2024-July', '2024-August'],
		datasets: [
			{
				label: 'Revenue',
				data: [15, 10, 8, 12],
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1,
			},
		],
	},
	{
		labels: ['2024-September', '2024-October', '2024-November', '2024-December'],
		datasets: [
			{
				label: 'Revenue',
				data: [7, 2, 11, 19],
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1,
			},
		],
	},
	{
		labels: ['2025-January', '2025-February', '2025-March', '2025-April'],
		datasets: [
			{
				label: 'Revenue',
				data: [22, 18, 16, 20],
				backgroundColor: 'rgba(255, 159, 64, 0.6)',
				borderColor: 'rgba(255, 159, 64, 1)',
				borderWidth: 1,
			},
		],
	},
	{
		labels: ['2025-May', '2025-June', '2025-July', '2025-August'],
		datasets: [
			{
				label: 'Revenue',
				data: [19, 21, 17, 23],
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	},
	{
		labels: ['2025-September', '2025-October', '2025-November', '2025-December'],
		datasets: [
			{
				label: 'Revenue',
				data: [25, 24, 28, 30],
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	}
]

export const Wall: React.FC = () => {

	const chartDataList = localChartDataList
	const [lastTime, setLastTime] = useState<number>(0);

	const [dynamicChartListIndex, setDynamicChartListIndex] = useState(0);
	const dynamicCurrentChartList = useMemo(() => {
		// console.log('dynamicChartListIndex:', dynamicChartListIndex);
		// console.log('boundary:', dynamicChartListIndex % (chartDataList.length / 3) * 3, (dynamicChartListIndex % (chartDataList.length / 3) + 1) * 3);
		return chartDataList.slice(dynamicChartListIndex % (chartDataList.length / 3) * 3, (dynamicChartListIndex % (chartDataList.length / 3) + 1) * 3)
	}, [dynamicChartListIndex, chartDataList]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime()
			console.log('Interval:', now - lastTime);
			setLastTime(now);
			setDynamicChartListIndex(index => index + 1);
		}, 2000);
		return () => clearInterval(interval);
	}, [lastTime]);

	return (
		<div>
			<div className='flex gap-2 flex-wrap'>
				{dynamicCurrentChartList.map((chartData, idx) => (
					<div key={idx} className='w-[400px]'>
						<BarChart
							labels={chartData.labels}
							datasets={chartData.datasets}
							title={`Chart ${idx + 1}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Wall;
