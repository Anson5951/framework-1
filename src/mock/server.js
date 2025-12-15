import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
	console.log('client connected');

	const sendSnapshot = () => {
		ws.send(
			JSON.stringify({
				type: 'DASHBOARD_SNAPSHOT',
				timestamp: Date.now(),
				widgets: [
					{
						id: 'summary-table',
						type: 'table',
						title: 'System Summary',
						columns: [
							{ key: 'name', label: 'Metric' },
							{ key: 'value', label: 'Value' }
						],
						rows: [
							{ name: 'CPU Avg', value: random(30, 80) + '%' },
							{ name: 'Memory Used', value: random(4, 32) + ' GB' },
							{ name: 'Disk Used', value: random(40, 90) + '%' }
						]
					},

					...Array.from({ length: 5 }).map((_, i) => ({
						id: `chart-${i + 1}`,
						type: 'barLineChart',
						title: `Chart ${i + 1}`,
						labels: ['10:00', '10:05', '10:10', '10:15'],
						datasets: [
							{
								type: 'bar',
								label: 'Load',
								data: randomArray(4, 40, 100)
							},
							{
								type: 'line',
								label: 'Avg',
								data: randomArray(4, 30, 80)
							}
						]
					}))
				]
			})
		);
	};

	sendSnapshot();
	const timer = setInterval(sendSnapshot, 3000);

	ws.on('close', () => clearInterval(timer));
});

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(len, min, max) {
	return Array.from({ length: len }, () => random(min, max));
}
