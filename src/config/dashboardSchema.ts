export interface DashboardSnapshot {
	type: 'DASHBOARD_SNAPSHOT';
	timestamp: number;

	layout: GridLayoutConfig;
	theme?: ThemeConfig;

	blocks: Block[];
}

/* ========== Layout ========== */

export interface GridLayoutConfig {
	columns: number;
	gap: number;
}

/* ========== Theme ========== */

export interface ThemeConfig {
	blockBorder?: BorderStyle;
	chartColors?: ChartColorTheme;
}

/* ========== Block ========== */

export interface Block {
	id: string;
	span: number;
	border?: BorderStyle;

	layout?: BlockLayout;   // 👈 新增：block 內排版
	widgets: Widget[];      // 👈 改成 array
}

/* ========== Block 內 Layout ========== */

export interface BlockLayout {
	columns: number; // 幾欄（例如 2 = 兩個 table 並排）
	gap: number;     // px（0 = 無間距）
}


/* ========== Widget ========== */

export type Widget = BarLineChartWidget | TableWidget;

/* ---------- Chart ---------- */

export interface BarLineChartWidget {
	type: 'barLineChart';
	title: string;

	chart: {
		labels: string[];
		datasets: ChartDataset[];
	};

	style?: {
		colors?: ChartColorTheme;
	};
}

export interface ChartDataset {
	type: 'bar' | 'line';
	label: string;
	data: number[];
	color?: string;
}

/* ---------- Table ---------- */

export interface TableWidget {
	type: 'table';
	title: string;
	columns: { key: string; label: string }[];
	rows: Record<string, string | number>[];
}

/* ========== Style ========== */

export interface BorderStyle {
	color: string;
	width: number;
}

export interface ChartColorTheme {
	bar?: string;
	line?: string;
}
