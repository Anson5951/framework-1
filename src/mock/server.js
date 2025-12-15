import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
	console.log('client connected');

	setInterval(() => {
		ws.send(
			JSON.stringify({
				type: 'DASHBOARD_SNAPSHOT',
				timestamp: Date.now(),
				layout: {
					blocks: [
						{
							blockId: 'cpu',
							grid: {
								lg: { x: 0, y: 0, w: 6, h: 4 },
								md: { x: 0, y: 0, w: 12, h: 4 },
								sm: { x: 0, y: 0, w: 12, h: 6 }
							},
							chart: {
								title: 'CPU Usage',
								labels: ['10:00', '10:05', '10:10'],
								datasets: [
									{
										type: 'bar',
										label: 'Load',
										data: randomArray()
									},
									{
										type: 'line',
										label: 'Avg',
										data: randomArray()
									}
								]
							}
						}
					]
				}
			})
		);
	}, 2000);
});

function randomArray() {
	return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
}
