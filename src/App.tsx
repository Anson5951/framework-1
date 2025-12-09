import { useCallback, useState } from 'react'
import './App.css'
import { testService } from './services/testService'
import { Checkbox } from './shadcn/components/ui/checkbox'
import { Button } from './shadcn/lib/ui/button'
import type { Joke } from './types/Joke'

function App() {

	const [joke, setJoke] = useState<Joke>();

	const getJoke = useCallback(() => {
		testService.getJoke()
			.then(response => {
				console.log('Response Data:', response);
				setJoke(response);
			})
	}, []);

	return (
		<>
			<Button onClick={() => getJoke()}>Get A Joke</Button>
			{joke && joke.type === 'twopart' ? (
				<>
					<p>{joke && (joke.setup)}</p>
					<p>...</p>
					<p>Answer: {joke && (joke.delivery)}</p>
				</>
			) : <p>{joke && (joke.joke)}</p>}

			<div className='gap-3'>
				<Checkbox />
				<label>test</label>
			</div>
		</>
	)
}

export default App
