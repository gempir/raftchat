import { ChatClient } from "dank-twitch-irc";
import React, { createContext, useState } from "react";
import { MosaicNode } from "react-mosaic-component";
import { QueryCache } from "react-query";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createRandomString } from "../services/createRandomString";

export interface State {
	chatClient: ChatClient,
	settings: MosaicNode<string> | null,
	channels: Record<string, string>,
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
		channels: {} as Record<string, string>,
		settings: {
			direction: "row",
			first: createRandomString(),
			second: createRandomString(),
			splitPercentage: 40,
		} as MosaicNode<string> | null,
		queryCache: new QueryCache(),
	},
	setState: (state: State) => {
		// do nothing
	},
	setSettings: (settings: MosaicNode<string> | null) => {
		// do nothing
	},
	setChannels: (channels: Record<string, string>) => {
		// do nothing
	},
};

const store = createContext(defaultContext);
const { Provider } = store;

const StateProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	
	const [settings, setSettings] = useLocalStorage("settings", defaultContext.state.settings);
	const [channels, setChannels] = useLocalStorage("channels", defaultContext.state.channels);

	const [state, setState] = useState({ ...defaultContext.state, settings, channels });

	return <Provider value={{ state, setState, setSettings, setChannels }}>{children}</Provider>;
};

export { store, StateProvider };
