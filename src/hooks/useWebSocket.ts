import type { DashboardSnapshot } from '@/types/DashboardSchema';
import { useEffect, useState } from 'react';


export function useWebSocket(url: string) {
	const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onmessage = event => {
			const data = JSON.parse(event.data);
			setSnapshot(data);
		};

		return () => {
			ws.close();
		};
	}, [url]);

	return snapshot;
}
