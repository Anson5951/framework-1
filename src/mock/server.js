import http from "http";
import { WebSocketServer } from "ws";

/**
 * HTTP server（用來處理 Upgrade）
 */
const server = http.createServer();

/**
 * WebSocket server（noServer 模式，最穩）
 */
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
	if (req.url !== "/ws") {
		socket.destroy();
		return;
	}

	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit("connection", ws, req);
	});
});

/**
 * 模擬狀態（讓數值連續變化，看起來像真的）
 */
let cpu_1 = 40;
let memory_1 = 60;
let netIn_1 = 100;
let netOut_1 = 80;
let cpu_2 = 40;
let memory_2 = 60;
let netIn_2 = 100;
let netOut_2 = 80;
let cpu_3 = 40;
let memory_3 = 60;
let netIn_3 = 100;
let netOut_3 = 80;

function drift(value, min, max, step = 5) {
	const delta = (Math.random() - 0.5) * step;
	const next = value + delta;
	return Math.max(min, Math.min(max, next));
}

wss.on("connection", (ws) => {
	console.log("WS client connected");

	const timer = setInterval(() => {
		const ts = Date.now();

		cpu_1 = drift(cpu_1, 0, 100, 4);
		memory_1 = drift(memory_1, 30, 90, 3);
		netIn_1 = drift(netIn_1, 20, 200, 15);
		netOut_1 = drift(netOut_1, 10, 180, 12);

		cpu_2 = drift(cpu_2, 0, 100, 4);
		memory_2 = drift(memory_2, 30, 90, 3);
		netIn_2 = drift(netIn_2, 20, 200, 15);
		netOut_2 = drift(netOut_2, 10, 180, 12);

		cpu_3 = drift(cpu_3, 0, 100, 4);
		memory_3 = drift(memory_3, 30, 90, 3);
		netIn_3 = drift(netIn_3, 20, 200, 15);
		netOut_3 = drift(netOut_3, 10, 180, 12);

		const message = {
			type: "charts:update",
			ts,
			charts: {
				/** 1 */
				/** 折線：CPU 使用率 */
				cpu_1: {
					payload: {
						points: [{ x: ts, y: Number(cpu_1.toFixed(1)) }]
					}
				},

				/** 折線：Memory 使用率 */
				memory_1: {
					payload: {
						points: [{ x: ts, y: Number(memory_1.toFixed(1)) }]
					}
				},

				/** Gauge：Disk 使用率 */
				disk_1: {
					payload: {
						value: Number(drift(70, 40, 95, 2).toFixed(1))
					}
				},

				/** 折線：Network In */
				net_in_1: {
					payload: {
						points: [{ x: ts, y: Math.round(netIn_1) }]
					}
				},

				/** 折線：Network Out */
				net_out_1: {
					payload: {
						points: [{ x: ts, y: Math.round(netOut_1) }]
					}
				},

				/** 長條：Request count by service */
				requests_1: {
					payload: {
						categories: ["API", "DB", "Cache"],
						values: [
							Math.floor(Math.random() * 120),
							Math.floor(Math.random() * 60),
							Math.floor(Math.random() * 30)
						]
					}
				},
				/** 2 */

				/** 折線：CPU 使用率 */
				cpu_2: {
					payload: {
						points: [{ x: ts, y: Number(cpu_2.toFixed(1)) }]
					}
				},

				/** 折線：Memory 使用率 */
				memory_2: {
					payload: {
						points: [{ x: ts, y: Number(memory_2.toFixed(1)) }]
					}
				},

				/** Gauge：Disk 使用率 */
				disk_2: {
					payload: {
						value: Number(drift(70, 40, 95, 2).toFixed(1))
					}
				},

				/** 折線：Network In */
				net_in_2: {
					payload: {
						points: [{ x: ts, y: Math.round(netIn_2) }]
					}
				},

				/** 折線：Network Out */
				net_out_2: {
					payload: {
						points: [{ x: ts, y: Math.round(netOut_2) }]
					}
				},

				/** 長條：Request count by service */
				requests_2: {
					payload: {
						categories: ["API", "DB", "Cache"],
						values: [
							Math.floor(Math.random() * 120),
							Math.floor(Math.random() * 60),
							Math.floor(Math.random() * 30)
						]
					}
				},
				/** 3 */

				/** 折線：CPU 使用率 */
				cpu_3: {
					payload: {
						points: [{ x: ts, y: Number(cpu_3.toFixed(1)) }]
					}
				},

				/** 折線：Memory 使用率 */
				memory_3: {
					payload: {
						points: [{ x: ts, y: Number(memory_3.toFixed(1)) }]
					}
				},

				/** Gauge：Disk 使用率 */
				disk_3: {
					payload: {
						value: Number(drift(70, 40, 95, 2).toFixed(1))
					}
				},

				/** 折線：Network In */
				net_in_3: {
					payload: {
						points: [{ x: ts, y: Math.round(netIn_3) }]
					}
				},

				/** 折線：Network Out */
				net_out_3: {
					payload: {
						points: [{ x: ts, y: Math.round(netOut_3) }]
					}
				},

				/** 長條：Request count by service */
				requests_3: {
					payload: {
						categories: ["API", "DB", "Cache"],
						values: [
							Math.floor(Math.random() * 120),
							Math.floor(Math.random() * 60),
							Math.floor(Math.random() * 30)
						]
					}
				},
			}
		};

		ws.send(JSON.stringify(message));
	}, 1000); // server 每秒推一次（前端自己控 3~10 秒畫）

	ws.on("close", () => {
		clearInterval(timer);
		console.log("WS client disconnected");
	});
});

server.listen(8080, () => {
	console.log("WS server running on ws://localhost:8080/ws");
});
