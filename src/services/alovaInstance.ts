import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

export const noCacheAlovaInstance = createAlova({
	requestAdapter: adapterFetch(),
	responded: response => response.json(),
	cacheFor: null
});
