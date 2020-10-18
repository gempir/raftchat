import { ChatClient } from "dank-twitch-irc";
import React, { createContext, useState } from "react";
import { MosaicParent } from "react-mosaic-component";
import { QueryCache } from "react-query";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface State {
	chatClient: ChatClient,
	settings: MosaicParent<string>,
	queryCache: QueryCache,
}

export type Action = Record<string, unknown>;

const defaultContext = {
	state: {
		chatClient: new ChatClient({
			connection: {
				type: "websocket",
				secure: true,
			}
		}),
		settings: {
			direction: "row",
			first: "gempir",
			second: {
				direction: "column",
				first: "pokimane",
				second: "pajlada",
			},
			splitPercentage: 40,
		} as MosaicParent<string>,
		queryCache: new QueryCache(),
	},
	setState: (state: State) => {
		// do nothing
	},
	setSettings: (settings: MosaicParent<string>) => {
		// do nothing
	},
};
const store = createContext(defaultContext);
const { Provider } = store;

const StateProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [settings, setSettings] = useLocalStorage("settings", defaultContext.state.settings);

	const [state, setState] = useState({ ...defaultContext.state, settings });

	return <Provider value={{ state, setState, setSettings }}>{children}</Provider>;
};

export { store, StateProvider };
