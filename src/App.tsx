import { useCallback, useMemo, useState } from 'react'
import './App.css'
import BarChartComponent from './components/barChart'
import { testService } from './services/testService'
import { Checkbox } from './shadcn/components/ui/checkbox'
import { Button } from './shadcn/lib/ui/button'
import type { Joke } from './types/Joke'
import type { Dataset } from './types/BarChartProps'

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
function App() {

	const [joke, setJoke] = useState<Joke>();
	const chartDataList = localChartDataList

	const [index, setIndex] = useState(0);
	const [label, setLabel] = useState<string[]>([])
	const [dataset, setDataset] = useState<Dataset[]>([]);

	const [chartListIndex, setChartListIndex] = useState(0);
	const currentChartList = useMemo(() => {
		console.log('chartListIndex:', chartListIndex);
		console.log('boundary:', chartListIndex % (chartDataList.length / 3) * 3, (chartListIndex % (chartDataList.length / 3) + 1) * 3);
		return chartDataList.slice(chartListIndex % (chartDataList.length / 3) * 3, (chartListIndex % (chartDataList.length / 3) + 1) * 3)
	}, [chartListIndex, chartDataList]);

	const getJoke = () => testService.getJoke()
		.then(response => {
			console.log('Response Data:', response);
			setJoke(response);
		})

	const getChartData = useCallback(() => {
		console.log('Current Index:', index);
		console.log('Current label:', label);
		console.log('Current datasets:', dataset);
		setIndex(index => (index + 1) % chartDataList.length);
		const data = chartDataList[index];
		setLabel(data.labels);
		setDataset(data.datasets);
	}, [index, chartDataList]);

	return (
		<>
			<p>// alova API call result display</p>
			<Button onClick={() => getJoke()}>Get A Joke</Button>
			{joke && joke.type === 'twopart' ? (
				<>
					<p>{joke && (joke.setup)}</p>
					<p>...</p>
					<p>Answer: {joke && (joke.delivery)}</p>
				</>
			) : <p>{joke && (joke.joke)}</p>}

			<hr />

			<p>// add shadcn</p>
			<div className='gap-3'>
				<Checkbox />
				<label>test</label>
			</div>

			<hr />

			<p>// updatable chart</p>
			<Button onClick={() => getChartData()}>Get A Chart Data</Button>
			{
				label?.length != 0 && <div>
					<BarChartComponent
						labels={label}
						datasets={dataset}
						title="Monthly Sales"
					/>
				</div>
			}

			<hr />

			<p>// flex display test with RWD</p>
			<div className='flex gap-2 flex-wrap'>
				{chartDataList.map((chartData, idx) => (
					<div key={idx} className='w-[400px]'>
						<BarChartComponent
							labels={chartData.labels}
							datasets={chartData.datasets}
							title={`Chart ${idx + 1}`}
						/>
					</div>
				))}
			</div>

			<hr />

			<p>// updatable charts</p>
			<Button onClick={() => setChartListIndex(index => index + 1)}>Get A Chart Data</Button>
			<div className='flex gap-2 flex-wrap'>
				{currentChartList.map((chartData, idx) => (
					<div key={idx} className='w-[400px]'>
						<BarChartComponent
							labels={chartData.labels}
							datasets={chartData.datasets}
							title={`Chart ${idx + 1}`}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default App
