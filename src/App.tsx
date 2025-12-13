import { useEffect, useRef, useState } from "react";

import { scheduler } from "./test/chartScheduler";
import { useWebSocket } from "./test/useWebSocket";
import { SCREEN_LAYOUTS } from "./test/screenLayouts";
import { ChartRegistry } from "./test/ChartRegistry";
import { SlotGrid } from "./test/SlotGrid";

export default function App() {
	const buffers = {
		cpu: useRef<any[]>([]),
		memory: useRef<any[]>([]),
		net_in: useRef<any[]>([]),
		net_out: useRef<any[]>([]),
		disk: useRef<{ value: number } | null>(null),
		requests: useRef<{ categories: string[]; values: number[] } | null>(null)
	};

	useWebSocket(buffers);

	const [screenIndex, setScreenIndex] = useState(0);
	const screenRef = useRef(0);
	const layout = SCREEN_LAYOUTS[screenIndex];

	const visibleMap = {
		cpu: layout.includes("cpu"),
		memory: layout.includes("memory"),
		net_in: layout.includes("net_in"),
		net_out: layout.includes("net_out"),
		disk: layout.includes("disk"),
		requests: layout.includes("requests")
	};

	useEffect(() => {
		scheduler.start();

		const timer = setInterval(() => {
			const next = (screenRef.current + 1) % SCREEN_LAYOUTS.length;
			screenRef.current = next;
			setScreenIndex(next);
		}, 15000);

		return () => clearInterval(timer);
	}, []);

	// 🔥 關鍵：chart registry 先建好
	const charts = ChartRegistry({ buffers, visibleMap });

	return (
		<div style={{ padding: 16 }}>
			<h2>Dashboard – Screen {screenIndex + 1}</h2>

			{/* 🔥 chart 真正 render 在 slot 裡 */}
			<SlotGrid layout={layout} charts={charts} />
		</div>
	);
}
