import {
	Chart,

	// Scales
	CategoryScale,
	LinearScale,

	// Controllers
	BarController,
	LineController,

	// Elements
	BarElement,
	LineElement,
	PointElement,

	// Plugins
	Tooltip,
	Legend,
	Title
} from 'chart.js';

Chart.register(
	CategoryScale,
	LinearScale,

	BarController,
	LineController,

	BarElement,
	LineElement,
	PointElement,

	Tooltip,
	Legend,
	Title
);
