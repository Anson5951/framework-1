import type { JSX } from "react";

/**
 * make layout independent
 */
export function SlotGrid({
	layout,
	charts
}: {
	layout: Array<string | null>;
	charts: Record<string, JSX.Element>;
}) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gridTemplateRows: "repeat(2, 260px)",
				gap: 16
			}}
		>
			{layout.map((chartId, idx) => (
				<div
					key={idx}
					style={{
						border: "1px solid #eee",
						padding: 8
					}}
				>
					{chartId ? charts[chartId] : null}
				</div>
			))}
		</div>
	);
}
