import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebSocketOptions {
	url: string;
	onMessage?: (data: any) => void;
	onError?: (error: Event) => void;
	onOpen?: () => void;
	onClose?: () => void;
}

export const useWebSocket = ({
	url,
	onMessage,
	onError,
	onOpen,
	onClose,
}: UseWebSocketOptions) => {
	const ws = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const send = useCallback((data: any) => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			ws.current.send(JSON.stringify(data));
		}
	}, []);

	useEffect(() => {
		ws.current = new WebSocket(url);

		ws.current.onopen = () => {
			setIsConnected(true);
			onOpen?.();
		};

		ws.current.onmessage = (event) => {
			onMessage?.(JSON.parse(event.data));
		};

		ws.current.onerror = (error) => {
			onError?.(error);
		};

		ws.current.onclose = () => {
			setIsConnected(false);
			onClose?.();
		};

		return () => {
			ws.current?.close();
		};
	}, [url, onMessage, onError, onOpen, onClose]);

	return { send, isConnected };
};
