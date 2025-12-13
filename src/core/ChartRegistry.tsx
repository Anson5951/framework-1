import { LineChart } from "../components/LineChart";
import { GaugeChart } from "../components/GaugeChart";
import { BarChart } from "../components/BarChart";
import { TABLE_CONFIG } from "../config/TableConfig";


export function ChartRegistry({
	buffers,
	visibleMap,
	screenIndex
}: {
	buffers: Record<string, any>;
	visibleMap: Record<string, boolean>;
	screenIndex: number;
}) {
	console.log("ChartRegistry called with screenIndex:", screenIndex);
	console.log("visibleMap:", visibleMap);
	return {
		cpu_1: (
			<LineChart
				key={TABLE_CONFIG.cpu_1.name}
				chartId={TABLE_CONFIG.cpu_1.name}
				bufferRef={buffers[TABLE_CONFIG.cpu_1.name]}
				interval={TABLE_CONFIG.cpu_1.interval}
				visible={visibleMap[TABLE_CONFIG.cpu_1.name]}
			/>
		),

		memory_1: (
			<LineChart
				key={TABLE_CONFIG.memory_1.name}
				chartId={TABLE_CONFIG.memory_1.name}
				bufferRef={buffers[TABLE_CONFIG.memory_1.name]}
				interval={TABLE_CONFIG.memory_1.interval}
				visible={visibleMap[TABLE_CONFIG.memory_1.name]}
			/>
		),

		net_in_1: (
			<LineChart
				key={TABLE_CONFIG.net_in_1.name}
				chartId={TABLE_CONFIG.net_in_1.name}
				bufferRef={buffers[TABLE_CONFIG.net_in_1.name]}
				interval={TABLE_CONFIG.net_in_1.interval}
				visible={visibleMap[TABLE_CONFIG.net_in_1.name]}
			/>
		),

		net_out_1: (
			<LineChart
				key={TABLE_CONFIG.net_out_1.name}
				chartId={TABLE_CONFIG.net_out_1.name}
				bufferRef={buffers[TABLE_CONFIG.net_out_1.name]}
				interval={TABLE_CONFIG.net_out_1.interval}
				visible={visibleMap[TABLE_CONFIG.net_out_1.name]}
			/>
		),

		disk_1: (
			<GaugeChart
				key={TABLE_CONFIG.disk_1.name}
				chartId={TABLE_CONFIG.disk_1.name}
				bufferRef={buffers[TABLE_CONFIG.disk_1.name]}
				interval={TABLE_CONFIG.disk_1.interval}
				visible={visibleMap[TABLE_CONFIG.disk_1.name]}
			/>
		),

		requests_1: (
			<BarChart
				key={TABLE_CONFIG.requests_1.name}
				chartId={TABLE_CONFIG.requests_1.name}
				bufferRef={buffers[TABLE_CONFIG.requests_1.name]}
				interval={TABLE_CONFIG.requests_1.interval}
				visible={visibleMap[TABLE_CONFIG.requests_1.name]}
			/>
		),


		cpu_2: (
			<LineChart
				key={TABLE_CONFIG.cpu_2.name}
				chartId={TABLE_CONFIG.cpu_2.name}
				bufferRef={buffers[TABLE_CONFIG.cpu_2.name]}
				interval={TABLE_CONFIG.cpu_2.interval}
				visible={visibleMap[TABLE_CONFIG.cpu_2.name]}
			/>
		),

		memory_2: (
			<LineChart
				key={TABLE_CONFIG.memory_2.name}
				chartId={TABLE_CONFIG.memory_2.name}
				bufferRef={buffers[TABLE_CONFIG.memory_2.name]}
				interval={TABLE_CONFIG.memory_2.interval}
				visible={visibleMap[TABLE_CONFIG.memory_2.name]}
			/>
		),

		net_in_2: (
			<LineChart
				key={TABLE_CONFIG.net_in_2.name}
				chartId={TABLE_CONFIG.net_in_2.name}
				bufferRef={buffers[TABLE_CONFIG.net_in_2.name]}
				interval={TABLE_CONFIG.net_in_2.interval}
				visible={visibleMap[TABLE_CONFIG.net_in_2.name]}
			/>
		),

		net_out_2: (
			<LineChart
				key={TABLE_CONFIG.net_out_2.name}
				chartId={TABLE_CONFIG.net_out_2.name}
				bufferRef={buffers[TABLE_CONFIG.net_out_2.name]}
				interval={TABLE_CONFIG.net_out_2.interval}
				visible={visibleMap[TABLE_CONFIG.net_out_2.name]}
			/>
		),

		disk_2: (
			<GaugeChart
				key={TABLE_CONFIG.disk_2.name}
				chartId={TABLE_CONFIG.disk_2.name}
				bufferRef={buffers[TABLE_CONFIG.disk_2.name]}
				interval={TABLE_CONFIG.disk_2.interval}
				visible={visibleMap[TABLE_CONFIG.disk_2.name]}
			/>
		),

		requests_2: (
			<BarChart
				key={TABLE_CONFIG.requests_2.name}
				chartId={TABLE_CONFIG.requests_2.name}
				bufferRef={buffers[TABLE_CONFIG.requests_2.name]}
				interval={TABLE_CONFIG.requests_2.interval}
				visible={visibleMap[TABLE_CONFIG.requests_2.name]}
			/>
		),


		cpu_3: (
			<LineChart
				key={TABLE_CONFIG.cpu_3.name}
				chartId={TABLE_CONFIG.cpu_3.name}
				bufferRef={buffers[TABLE_CONFIG.cpu_3.name]}
				interval={TABLE_CONFIG.cpu_3.interval}
				visible={visibleMap[TABLE_CONFIG.cpu_3.name]}
			/>
		),

		memory_3: (
			<LineChart
				key={TABLE_CONFIG.memory_3.name}
				chartId={TABLE_CONFIG.memory_3.name}
				bufferRef={buffers[TABLE_CONFIG.memory_3.name]}
				interval={TABLE_CONFIG.memory_3.interval}
				visible={visibleMap[TABLE_CONFIG.memory_3.name]}
			/>
		),

		net_in_3: (
			<LineChart
				key={TABLE_CONFIG.net_in_3.name}
				chartId={TABLE_CONFIG.net_in_3.name}
				bufferRef={buffers[TABLE_CONFIG.net_in_3.name]}
				interval={TABLE_CONFIG.net_in_3.interval}
				visible={visibleMap[TABLE_CONFIG.net_in_3.name]}
			/>
		),

		net_out_3: (
			<LineChart
				key={TABLE_CONFIG.net_out_3.name}
				chartId={TABLE_CONFIG.net_out_3.name}
				bufferRef={buffers[TABLE_CONFIG.net_out_3.name]}
				interval={TABLE_CONFIG.net_out_3.interval}
				visible={visibleMap[TABLE_CONFIG.net_out_3.name]}
			/>
		),

		disk_3: (
			<GaugeChart
				key={TABLE_CONFIG.disk_3.name}
				chartId={TABLE_CONFIG.disk_3.name}
				bufferRef={buffers[TABLE_CONFIG.disk_3.name]}
				interval={TABLE_CONFIG.disk_3.interval}
				visible={visibleMap[TABLE_CONFIG.disk_3.name]}
			/>
		),

		requests_3: (
			<BarChart
				key={TABLE_CONFIG.requests_3.name}
				chartId={TABLE_CONFIG.requests_3.name}
				bufferRef={buffers[TABLE_CONFIG.requests_3.name]}
				interval={TABLE_CONFIG.requests_3.interval}
				visible={visibleMap[TABLE_CONFIG.requests_3.name]}
			/>
		)
	};
}
