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
	visibleMap
}: {
	buffers: Record<string, any>;
	visibleMap: Record<string, boolean>;
}) {
	return {
		cpu: (
			<LineChart
				chartId="cpu"
				bufferRef={buffers.cpu}
				interval={INTERVAL.cpu}
				visible={visibleMap.cpu}
			/>
		),

		memory: (
			<LineChart
				chartId="memory"
				bufferRef={buffers.memory}
				interval={INTERVAL.memory}
				visible={visibleMap.memory}
			/>
		),

		net_in: (
			<LineChart
				chartId="net_in"
				bufferRef={buffers.net_in}
				interval={INTERVAL.net_in}
				visible={visibleMap.net_in}
			/>
		),

		net_out: (
			<LineChart
				chartId="net_out"
				bufferRef={buffers.net_out}
				interval={INTERVAL.net_out}
				visible={visibleMap.net_out}
			/>
		),

		disk: (
			<GaugeChart
				chartId="disk"
				bufferRef={buffers.disk}
				interval={INTERVAL.disk}
				visible={visibleMap.disk}
			/>
		),

		requests: (
			<BarChart
				chartId="requests"
				bufferRef={buffers.requests}
				interval={INTERVAL.requests}
				visible={visibleMap.requests}
			/>
		)
	};
}
