import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
	console.log('client connected');

	const sendSnapshot = () => {
		ws.send(
			JSON.stringify({
				type: 'DASHBOARD_SNAPSHOT',
				timestamp: Date.now(),

				/* ===== Dashboard layout ===== */
				layout: {
					columns: 3,
					gap: 16
				},

				/* ===== Global theme ===== */
				theme: {
					blockBorder: { color: '#525252ff', width: 2 },
					chartColors: {
						bar: '#4e79a7',
						line: '#e15759'
					}
				},

				/* ===== Blocks ===== */
				blocks: [
					/* ===============================
					 * ① 單 table block
					 * =============================== */
					{
						id: 'single-table',
						span: 1,
						widgets: [
							{
								type: 'table',
								title: 'System Overview',
								columns: [
									{ key: 'name', label: 'Metric' },
									{ key: 'value', label: 'Value' }
								],
								rows: [
									{ name: 'CPU Avg', value: rand(40, 80) + '%' },
									{ name: 'Memory Used', value: rand(8, 32) + ' GB' },
									{ name: 'Disk Used', value: rand(50, 90) + '%' }
								]
							}
						]
					},

					/* ===============================
					 * ② 雙 table block（並排、無 gap）
					 * =============================== */
					{
						id: 'double-table',
						span: 2,
						layout: {
							columns: 2,
							gap: 0
						},
						widgets: [
							{
								type: 'table',
								title: 'CPU Detail',
								columns: [
									{ key: 'core', label: 'Core' },
									{ key: 'usage', label: 'Usage (%)' }
								],
								rows: [
									{ core: 'core-1', usage: rand(40, 90) },
									{ core: 'core-2', usage: rand(40, 90) }
								]
							},
							{
								type: 'table',
								title: 'Memory Detail',
								columns: [
									{ key: 'type', label: 'Type' },
									{ key: 'value', label: 'Value' }
								],
								rows: [
									{ type: 'Used', value: rand(8, 24) + ' GB' },
									{ type: 'Free', value: rand(4, 16) + ' GB' }
								]
							}
						]
					},

					/* ===============================
					 * ③ 6 個 chart blocks
					 * =============================== */
					...Array.from({ length: 6 }).map((_, i) => ({
						id: `chart-${i + 1}`,
						span: 1,
						widgets: [
							{
								type: 'barLineChart',
								title: `Chart ${i + 1}`,
								chart: {
									labels: ['10:00', '10:05', '10:10', '10:15'],
									datasets: [
										{
											type: 'bar',
											label: 'Load',
											data: randArr(4, 40, 100)
										},
										{
											type: 'line',
											label: 'Avg',
											data: randArr(4, 30, 80)
										}
									]
								}
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

/* ===== helpers ===== */

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randArr(len, min, max) {
	return Array.from({ length: len }, () => rand(min, max));
}
