import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Wall from './pages/Wall'
import './core/ChartRegistry';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/wall' element={<Wall />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)


