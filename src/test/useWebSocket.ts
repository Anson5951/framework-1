import { useEffect } from "react";

const MAX_POINTS = 300;

export function useWebSocket(buffers: Record<string, any>) {
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080/ws");

		ws.onmessage = (e) => {
			const msg = JSON.parse(e.data);
			if (msg.type !== "charts:update") return;
			console.log("Received data:", msg);
			Object.entries(msg.charts).forEach(([id, data]: any) => {
				console.log(`Updating chart ${id}:`, data);
				const ref = buffers[id];
				if (!ref) return;

				const payload = data.payload;

				// line
				if (payload.points) {
					payload.points.forEach((p: any) => ref.current.push(p));
					if (ref.current.length > MAX_POINTS) {
						ref.current.splice(
							0,
							ref.current.length - MAX_POINTS
						);
					}
				}

				// gauge
				if (payload.value !== undefined) {
					ref.current = { value: payload.value };
				}

				// bar
				if (payload.categories) {
					ref.current = {
						categories: payload.categories,
						values: payload.values
					};
				}
			});
		};

		return () => ws.close();
	}, []);
}
