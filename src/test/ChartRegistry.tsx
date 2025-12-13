import { LineChart } from "../components/LineChart";
import { GaugeChart } from "../components/GaugeChart";
import { BarChart } from "../components/BarChart";

const INTERVAL = {
	cpu: 3000,
	memory: 4000,
	net_in: 6000,
	net_out: 8000,
	disk: 10000,
	requests: 5000
};

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
				chartId={"cpu_" + (screenIndex + 1)}
				bufferRef={buffers["cpu_1"]}
				interval={INTERVAL.cpu}
				visible={visibleMap.cpu_1}
			/>
		),

		memory_1: (
			<LineChart
				chartId={"memory_" + (screenIndex + 1)}
				bufferRef={buffers["memory_1"]}
				interval={INTERVAL.memory}
				visible={visibleMap.memory_1}
			/>
		),

		net_in_1: (
			<LineChart
				chartId={"net_in_" + (screenIndex + 1)}
				bufferRef={buffers["net_in_1"]}
				interval={INTERVAL.net_in}
				visible={visibleMap.net_in_1}
			/>
		),

		net_out_1: (
			<LineChart
				chartId={"net_out_" + (screenIndex + 1)}
				bufferRef={buffers["net_out_1"]}
				interval={INTERVAL.net_out}
				visible={visibleMap.net_out_1}
			/>
		),

		disk_1: (
			<GaugeChart
				chartId={"disk_" + (screenIndex + 1)}
				bufferRef={buffers["disk_1"]}
				interval={INTERVAL.disk}
				visible={visibleMap.disk_1}
			/>
		),

		requests_1: (
			<BarChart
				chartId={"requests_" + (screenIndex + 1)}
				bufferRef={buffers["requests_1"]}
				interval={INTERVAL.requests}
				visible={visibleMap.requests_1}
			/>
		),


		cpu_2: (
			<LineChart
				chartId={"cpu_" + (screenIndex + 1)}
				bufferRef={buffers["cpu_2"]}
				interval={INTERVAL.cpu}
				visible={visibleMap.cpu_2}
			/>
		),

		memory_2: (
			<LineChart
				chartId={"memory_" + (screenIndex + 1)}
				bufferRef={buffers["memory_2"]}
				interval={INTERVAL.memory}
				visible={visibleMap.memory_2}
			/>
		),

		net_in_2: (
			<LineChart
				chartId={"net_in_" + (screenIndex + 1)}
				bufferRef={buffers["net_in_2"]}
				interval={INTERVAL.net_in}
				visible={visibleMap.net_in_2}
			/>
		),

		net_out_2: (
			<LineChart
				chartId={"net_out_" + (screenIndex + 1)}
				bufferRef={buffers["net_out_2"]}
				interval={INTERVAL.net_out}
				visible={visibleMap.net_out_2}
			/>
		),

		disk_2: (
			<GaugeChart
				chartId={"disk_" + (screenIndex + 1)}
				bufferRef={buffers["disk_2"]}
				interval={INTERVAL.disk}
				visible={visibleMap.disk_2}
			/>
		),

		requests_2: (
			<BarChart
				chartId={"requests_" + (screenIndex + 1)}
				bufferRef={buffers["requests_2"]}
				interval={INTERVAL.requests}
				visible={visibleMap.requests_2}
			/>
		),


		cpu_3: (
			<LineChart
				chartId={"cpu_" + (screenIndex + 1)}
				bufferRef={buffers["cpu_3"]}
				interval={INTERVAL.cpu}
				visible={visibleMap.cpu_3}
			/>
		),

		memory_3: (
			<LineChart
				chartId={"memory_" + (screenIndex + 1)}
				bufferRef={buffers["memory_3"]}
				interval={INTERVAL.memory}
				visible={visibleMap.memory_3}
			/>
		),

		net_in_3: (
			<LineChart
				chartId={"net_in_" + (screenIndex + 1)}
				bufferRef={buffers["net_in_3"]}
				interval={INTERVAL.net_in}
				visible={visibleMap.net_in_3}
			/>
		),

		net_out_3: (
			<LineChart
				chartId={"net_out_" + (screenIndex + 1)}
				bufferRef={buffers["net_out_3"]}
				interval={INTERVAL.net_out}
				visible={visibleMap.net_out_3}
			/>
		),

		disk_3: (
			<GaugeChart
				chartId={"disk_" + (screenIndex + 1)}
				bufferRef={buffers["disk_3"]}
				interval={INTERVAL.disk}
				visible={visibleMap.disk_3}
			/>
		),

		requests_3: (
			<BarChart
				chartId={"requests_" + (screenIndex + 1)}
				bufferRef={buffers["requests_3"]}
				interval={INTERVAL.requests}
				visible={visibleMap.requests_3}
			/>
		)
	};
}
