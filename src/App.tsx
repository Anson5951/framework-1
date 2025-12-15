import BarLineChart from './components/BarLineChart';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
	const snapshot = useWebSocket('ws://localhost:8080');

	if (!snapshot) return <div>Waiting for data...</div>;

	return (
		<div className="grid">
			{snapshot.layout.blocks.map(block => (
				<div key={block.blockId} className="block">
					<BarLineChart data={block.chart} />
				</div>
			))}
		</div>
	);
}
