
import { renderWidget } from './components/renderWidget';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
	const snapshot = useWebSocket('ws://localhost:8080');

	if (!snapshot || snapshot.type !== 'DASHBOARD_SNAPSHOT') {
		return <div>Waiting for dashboard snapshot...</div>;
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${snapshot.layout.columns}, 1fr)`,
				gap: snapshot.layout.gap
			}}
		>
			{snapshot.blocks.map(block => (
				<div
					key={block.id}
					style={{
						gridColumn: `span ${block.span}`,
						border: block.border
							? `${block.border.width}px solid ${block.border.color}`
							: snapshot.theme?.blockBorder
								? `${snapshot.theme.blockBorder.width}px solid ${snapshot.theme.blockBorder.color}`
								: undefined,
						padding: 8
					}}
				>
					{/* 👇 block 內排版 */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: block.layout
								? `repeat(${block.layout.columns}, 1fr)`
								: '1fr',
							gap: block.layout?.gap ?? 0
						}}
					>
						{block.widgets.map((widget, idx) => (
							<div key={idx}>
								{renderWidget(widget, snapshot.theme)}
							</div>
						))}
					</div>
				</div>
			))}

		</div>
	);
}
