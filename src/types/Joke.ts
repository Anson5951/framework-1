type Flags = {
	nsfw: boolean;
	religious: boolean;
	political: boolean;
	racist: boolean;
	sexist: boolean;
	explicit: boolean;
};

type Joke = {
	error: boolean;
	category: string;
	type: "twopart" | "single";
	setup?: string;
	delivery?: string;
	joke?: string;
	flags: Flags;
	id: number;
	safe: boolean;
	lang: string;
};

export type { Joke, Flags };
