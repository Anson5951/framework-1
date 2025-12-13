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
let cpu = 40;
let memory = 60;
let netIn = 100;
let netOut = 80;

function drift(value, min, max, step = 5) {
	const delta = (Math.random() - 0.5) * step;
	const next = value + delta;
	return Math.max(min, Math.min(max, next));
}

wss.on("connection", (ws) => {
	console.log("WS client connected");

	const timer = setInterval(() => {
		const ts = Date.now();

		cpu = drift(cpu, 0, 100, 4);
		memory = drift(memory, 30, 90, 3);
		netIn = drift(netIn, 20, 200, 15);
		netOut = drift(netOut, 10, 180, 12);

		const message = {
			type: "charts:update",
			ts,
			charts: {
				/** 折線：CPU 使用率 */
				cpu: {
					payload: {
						points: [{ x: ts, y: Number(cpu.toFixed(1)) }]
					}
				},

				/** 折線：Memory 使用率 */
				memory: {
					payload: {
						points: [{ x: ts, y: Number(memory.toFixed(1)) }]
					}
				},

				/** Gauge：Disk 使用率 */
				disk: {
					payload: {
						value: Number(drift(70, 40, 95, 2).toFixed(1))
					}
				},

				/** 折線：Network In */
				net_in: {
					payload: {
						points: [{ x: ts, y: Math.round(netIn) }]
					}
				},

				/** 折線：Network Out */
				net_out: {
					payload: {
						points: [{ x: ts, y: Math.round(netOut) }]
					}
				},

				/** 長條：Request count by service */
				requests: {
					payload: {
						categories: ["API", "DB", "Cache"],
						values: [
							Math.floor(Math.random() * 120),
							Math.floor(Math.random() * 60),
							Math.floor(Math.random() * 30)
						]
					}
				}
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
