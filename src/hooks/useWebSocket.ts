import type { DashboardSnapshot } from '@/config/dashboardSchema';
import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
	const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onmessage = event => {
			setSnapshot(JSON.parse(event.data));
		};

		return () => ws.close();
	}, [url]);

	return snapshot;
}
