import type { Widget } from '../config/dashboardSchema';
import BarLineChart from './BarLineChart';
import TableWidget from './TableWidget';

export function renderWidget(widget: Widget) {
	switch (widget.type) {
		case 'table':
			return <TableWidget key={widget.id} data={widget} />;

		case 'barLineChart':
			return <BarLineChart key={widget.id} data={widget} />;

		default:
			return null;
	}
}
