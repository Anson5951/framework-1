import { useEffect, useMemo, useRef, useState } from "react";

import { scheduler } from "./core/ChartScheduler";
import { useWebSocket } from "./hooks/useWebSocket";
import { LAYOUT_CONFIG } from "./config/LayoutConfig";
import { ChartRegistry } from "./core/ChartRegistry";
import { SlotGrid } from "./components/SlotGrid";
import { TABLE_CONFIG } from "./config/TableConfig";

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
		return LAYOUT_CONFIG[screenIndex];
	}, [screenIndex]);

	const visibleMap = useMemo(() => {
		console.log("layout for screenIndex", screenIndex, "is", layout);
		return {
			cpu_1: layout.includes(TABLE_CONFIG.cpu_1.name),
			memory_1: layout.includes(TABLE_CONFIG.memory_1.name),
			net_in_1: layout.includes(TABLE_CONFIG.net_in_1.name),
			net_out_1: layout.includes(TABLE_CONFIG.net_out_1.name),
			disk_1: layout.includes(TABLE_CONFIG.disk_1.name),
			requests_1: layout.includes(TABLE_CONFIG.requests_1.name),

			cpu_2: layout.includes(TABLE_CONFIG.cpu_2.name),
			memory_2: layout.includes(TABLE_CONFIG.memory_2.name),
			net_in_2: layout.includes(TABLE_CONFIG.net_in_2.name),
			net_out_2: layout.includes(TABLE_CONFIG.net_out_2.name),
			disk_2: layout.includes(TABLE_CONFIG.disk_2.name),
			requests_2: layout.includes(TABLE_CONFIG.requests_2.name),

			cpu_3: layout.includes(TABLE_CONFIG.cpu_3.name),
			memory_3: layout.includes(TABLE_CONFIG.memory_3.name),
			net_in_3: layout.includes(TABLE_CONFIG.net_in_3.name),
			net_out_3: layout.includes(TABLE_CONFIG.net_out_3.name),
			disk_3: layout.includes(TABLE_CONFIG.disk_3.name),
			requests_3: layout.includes(TABLE_CONFIG.requests_3.name),
		}
	}, [screenIndex, layout]);

	useEffect(() => {
		scheduler.start();

		const timer = setInterval(() => {
			const next = (screenRef.current + 1) % LAYOUT_CONFIG.length;
			screenRef.current = next;
			setScreenIndex(next);
		}, 15000);

		return () => clearInterval(timer);
	}, []);

	const charts = ChartRegistry({ buffers, visibleMap, screenIndex });

	return (
		<div style={{ padding: 16 }}>
			<h2>Dashboard - Screen {screenIndex + 1}</h2>

			{/* 🔥 chart 真正 render 在 slot 裡 */}
			<SlotGrid layout={layout} charts={charts} />
		</div>
	);
}
