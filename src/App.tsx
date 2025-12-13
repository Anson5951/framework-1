import { useEffect, useMemo, useRef, useState } from "react";

import { scheduler } from "./test/chartScheduler";
import { useWebSocket } from "./test/useWebSocket";
import { SCREEN_LAYOUTS } from "./test/screenLayouts";
import { ChartRegistry } from "./test/ChartRegistry";
import { SlotGrid } from "./test/SlotGrid";

export default function App() {
	const buffers = {
		cpu_1: useRef<any[]>([]),
		memory_1: useRef<any[]>([]),
		net_in_1: useRef<any[]>([]),
		net_out_1: useRef<any[]>([]),
		disk_1: useRef<{ value: number } | null>(null),
		requests_1: useRef<{ categories: string[]; values: number[] } | null>(null),
		cpu_2: useRef<any[]>([]),
		memory_2: useRef<any[]>([]),
		net_in_2: useRef<any[]>([]),
		net_out_2: useRef<any[]>([]),
		disk_2: useRef<{ value: number } | null>(null),
		requests_2: useRef<{ categories: string[]; values: number[] } | null>(null),
		cpu_3: useRef<any[]>([]),
		memory_3: useRef<any[]>([]),
		net_in_3: useRef<any[]>([]),
		net_out_3: useRef<any[]>([]),
		disk_3: useRef<{ value: number } | null>(null),
		requests_3: useRef<{ categories: string[]; values: number[] } | null>(null)
	};

	useWebSocket(buffers);

	const [screenIndex, setScreenIndex] = useState(0);
	const screenRef = useRef(0);
	const layout = useMemo(() => {
		console.log("Calculating layout for screenIndex:", screenIndex);
		return SCREEN_LAYOUTS[screenIndex];
	}, [screenIndex]);

	const visibleMap = useMemo(() => {
		console.log("layout for screenIndex", screenIndex, "is", layout);
		return {
			cpu_1: layout.includes("cpu_1"),
			memory_1: layout.includes("memory_1"),
			net_in_1: layout.includes("net_in_1"),
			net_out_1: layout.includes("net_out_1"),
			disk_1: layout.includes("disk_1"),
			requests_1: layout.includes("requests_1"),

			cpu_2: layout.includes("cpu_2"),
			memory_2: layout.includes("memory_2"),
			net_in_2: layout.includes("net_in_2"),
			net_out_2: layout.includes("net_out_2"),
			disk_2: layout.includes("disk_2"),
			requests_2: layout.includes("requests_2"),

			cpu_3: layout.includes("cpu_3"),
			memory_3: layout.includes("memory_3"),
			net_in_3: layout.includes("net_in_3"),
			net_out_3: layout.includes("net_out_3"),
			disk_3: layout.includes("disk_3"),
			requests_3: layout.includes("requests_3"),
		}
	}, [screenIndex, layout]);

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
	const charts = ChartRegistry({ buffers, visibleMap, screenIndex });

	return (
		<div style={{ padding: 16 }}>
			<h2>Dashboard - Screen {screenIndex + 1}</h2>

			{/* 🔥 chart 真正 render 在 slot 裡 */}
			<SlotGrid layout={layout} charts={charts} />
		</div>
	);
}
