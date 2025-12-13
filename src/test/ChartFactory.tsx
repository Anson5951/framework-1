import { BarChart } from "@/components/BarChart";
import { GaugeChart } from "@/components/GaugeChart";
import { LineChart } from "@/components/LineChart";
import type { JSX } from "react";


export function ChartFactory(buffers: Record<string, any>) {
	const charts: Record<string, JSX.Element> = {};

	Object.keys(buffers).forEach(id => {
		if (id.includes("disk")) {
			charts[id] = <GaugeChart key={id} chartId={id} bufferRef={buffers[id]} interval={4000} visible={false} />;
		} else if (id.includes("requests")) {
			charts[id] = <BarChart key={id} chartId={id} bufferRef={buffers[id]} interval={4000} visible={false} />;
		} else {
			charts[id] = <LineChart key={id} chartId={id} bufferRef={buffers[id]} interval={4000} visible={false} />;
		}
	});

	return charts;
}
