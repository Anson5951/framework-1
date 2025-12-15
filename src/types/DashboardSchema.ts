export type Breakpoint = 'lg' | 'md' | 'sm';

export interface DashboardSnapshot {
	type: 'DASHBOARD_SNAPSHOT';
	timestamp: number;
	layout: {
		blocks: Block[];
	};
}

export interface Block {
	blockId: string;
	grid: Record<Breakpoint, GridLayout>;
	chart: BarLineChartData;
}

export interface GridLayout {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface BarLineChartData {
	title: string;
	labels: string[];
	datasets: Array<{
		type: 'bar' | 'line';
		label: string;
		data: number[];
	}>;
}
