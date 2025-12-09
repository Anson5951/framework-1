import type { Joke } from "@/types/Joke";
import { noCacheAlovaInstance } from "./alovaInstance";


export const testService = {
	getJoke: () =>
		noCacheAlovaInstance.Get<Joke>('https://v2.jokeapi.dev/joke/Programming')
};
