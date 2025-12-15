import type { Widget, ThemeConfig } from '../config/dashboardSchema';
import BarLineChart from './BarLineChart';
import TableWidget from './TableWidget';

export function renderWidget(widget: Widget, theme?: ThemeConfig) {
	switch (widget.type) {
		case 'table':
			return <TableWidget widget={widget} />;

		case 'barLineChart':
			return <BarLineChart widget={widget} theme={theme} />;

		default:
			return null;
	}
}
