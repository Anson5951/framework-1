import { useWebSocket } from './hooks/useWebSocket';
import { renderWidget } from './components/renderWidget';

export default function App() {
	const snapshot = useWebSocket('ws://localhost:8080');

	if (!snapshot) return <div>Waiting for data...</div>;

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '16px'
			}}
		>
			{snapshot.widgets.map(renderWidget)}
		</div>
	);
}
