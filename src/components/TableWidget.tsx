import type { TableWidget as TableWidgetType } from '../config/dashboardSchema';

export default function TableWidget({ widget }: { widget: TableWidgetType }) {
	return (
		<div>
			<h3>{widget.title}</h3>
			<table width="100%" border={1}>
				<thead>
					<tr>
						{widget.columns.map(col => (
							<th key={col.key}>{col.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{widget.rows.map((row, i) => (
						<tr key={i}>
							{widget.columns.map(col => (
								<td key={col.key}>{row[col.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
