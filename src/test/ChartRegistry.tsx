import { LineChart } from "../components/LineChart";
import { GaugeChart } from "../components/GaugeChart";
import { BarChart } from "../components/BarChart";
import { tableConfig } from "./tableConfig";


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
				key={tableConfig.cpu_1.name}
				chartId={tableConfig.cpu_1.name}
				bufferRef={buffers[tableConfig.cpu_1.name]}
				interval={tableConfig.cpu_1.interval}
				visible={visibleMap[tableConfig.cpu_1.name]}
			/>
		),

		memory_1: (
			<LineChart
				key={tableConfig.memory_1.name}
				chartId={tableConfig.memory_1.name}
				bufferRef={buffers[tableConfig.memory_1.name]}
				interval={tableConfig.memory_1.interval}
				visible={visibleMap[tableConfig.memory_1.name]}
			/>
		),

		net_in_1: (
			<LineChart
				key={tableConfig.net_in_1.name}
				chartId={tableConfig.net_in_1.name}
				bufferRef={buffers[tableConfig.net_in_1.name]}
				interval={tableConfig.net_in_1.interval}
				visible={visibleMap[tableConfig.net_in_1.name]}
			/>
		),

		net_out_1: (
			<LineChart
				key={tableConfig.net_out_1.name}
				chartId={tableConfig.net_out_1.name}
				bufferRef={buffers[tableConfig.net_out_1.name]}
				interval={tableConfig.net_out_1.interval}
				visible={visibleMap[tableConfig.net_out_1.name]}
			/>
		),

		disk_1: (
			<GaugeChart
				key={tableConfig.disk_1.name}
				chartId={tableConfig.disk_1.name}
				bufferRef={buffers[tableConfig.disk_1.name]}
				interval={tableConfig.disk_1.interval}
				visible={visibleMap[tableConfig.disk_1.name]}
			/>
		),

		requests_1: (
			<BarChart
				key={tableConfig.requests_1.name}
				chartId={tableConfig.requests_1.name}
				bufferRef={buffers[tableConfig.requests_1.name]}
				interval={tableConfig.requests_1.interval}
				visible={visibleMap[tableConfig.requests_1.name]}
			/>
		),


		cpu_2: (
			<LineChart
				key={tableConfig.cpu_2.name}
				chartId={tableConfig.cpu_2.name}
				bufferRef={buffers[tableConfig.cpu_2.name]}
				interval={tableConfig.cpu_2.interval}
				visible={visibleMap[tableConfig.cpu_2.name]}
			/>
		),

		memory_2: (
			<LineChart
				key={tableConfig.memory_2.name}
				chartId={tableConfig.memory_2.name}
				bufferRef={buffers[tableConfig.memory_2.name]}
				interval={tableConfig.memory_2.interval}
				visible={visibleMap[tableConfig.memory_2.name]}
			/>
		),

		net_in_2: (
			<LineChart
				key={tableConfig.net_in_2.name}
				chartId={tableConfig.net_in_2.name}
				bufferRef={buffers[tableConfig.net_in_2.name]}
				interval={tableConfig.net_in_2.interval}
				visible={visibleMap[tableConfig.net_in_2.name]}
			/>
		),

		net_out_2: (
			<LineChart
				key={tableConfig.net_out_2.name}
				chartId={tableConfig.net_out_2.name}
				bufferRef={buffers[tableConfig.net_out_2.name]}
				interval={tableConfig.net_out_2.interval}
				visible={visibleMap[tableConfig.net_out_2.name]}
			/>
		),

		disk_2: (
			<GaugeChart
				key={tableConfig.disk_2.name}
				chartId={tableConfig.disk_2.name}
				bufferRef={buffers[tableConfig.disk_2.name]}
				interval={tableConfig.disk_2.interval}
				visible={visibleMap[tableConfig.disk_2.name]}
			/>
		),

		requests_2: (
			<BarChart
				key={tableConfig.requests_2.name}
				chartId={tableConfig.requests_2.name}
				bufferRef={buffers[tableConfig.requests_2.name]}
				interval={tableConfig.requests_2.interval}
				visible={visibleMap[tableConfig.requests_2.name]}
			/>
		),


		cpu_3: (
			<LineChart
				key={tableConfig.cpu_3.name}
				chartId={tableConfig.cpu_3.name}
				bufferRef={buffers[tableConfig.cpu_3.name]}
				interval={tableConfig.cpu_3.interval}
				visible={visibleMap[tableConfig.cpu_3.name]}
			/>
		),

		memory_3: (
			<LineChart
				key={tableConfig.memory_3.name}
				chartId={tableConfig.memory_3.name}
				bufferRef={buffers[tableConfig.memory_3.name]}
				interval={tableConfig.memory_3.interval}
				visible={visibleMap[tableConfig.memory_3.name]}
			/>
		),

		net_in_3: (
			<LineChart
				key={tableConfig.net_in_3.name}
				chartId={tableConfig.net_in_3.name}
				bufferRef={buffers[tableConfig.net_in_3.name]}
				interval={tableConfig.net_in_3.interval}
				visible={visibleMap[tableConfig.net_in_3.name]}
			/>
		),

		net_out_3: (
			<LineChart
				key={tableConfig.net_out_3.name}
				chartId={tableConfig.net_out_3.name}
				bufferRef={buffers[tableConfig.net_out_3.name]}
				interval={tableConfig.net_out_3.interval}
				visible={visibleMap[tableConfig.net_out_3.name]}
			/>
		),

		disk_3: (
			<GaugeChart
				key={tableConfig.disk_3.name}
				chartId={tableConfig.disk_3.name}
				bufferRef={buffers[tableConfig.disk_3.name]}
				interval={tableConfig.disk_3.interval}
				visible={visibleMap[tableConfig.disk_3.name]}
			/>
		),

		requests_3: (
			<BarChart
				key={tableConfig.requests_3.name}
				chartId={tableConfig.requests_3.name}
				bufferRef={buffers[tableConfig.requests_3.name]}
				interval={tableConfig.requests_3.interval}
				visible={visibleMap[tableConfig.requests_3.name]}
			/>
		)
	};
}
