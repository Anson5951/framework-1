export type BarChartProps = {
	labels: string[];
	datasets: Array<Dataset>;
	title?: string;
}

export type Dataset = {
		label: string;
		data: number[];
		backgroundColor?: string;
		borderColor?: string;
		borderWidth?: number;
}
