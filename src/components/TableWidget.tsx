import type { TableWidget } from '../config/dashboardSchema';

interface Props {
	data: TableWidget;
}

export default function TableWidget({ data }: Props) {
	return (
		<div>
			<h3>{data.title}</h3>
			<table border={1} width="100%">
				<thead>
					<tr>
						{data.columns.map(col => (
							<th key={col.key}>{col.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((row, idx) => (
						<tr key={idx}>
							{data.columns.map(col => (
								<td key={col.key}>{row[col.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
