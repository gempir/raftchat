import { ChatClient } from "dank-twitch-irc";
import React, { createContext, useState } from "react";
import { Settings } from "../chat/Settings";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface State {
	chatClient: ChatClient,
	settings: Settings
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
		settings: { tabs: [] } as Settings
	},
	setState: (state: State) => { 
		// do nothing
	},
	setSettings: (settings: Settings) => { 
		// do nothing
	},
};
const store = createContext(defaultContext);
const { Provider } = store;

const StateProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [settings, setSettings] = useLocalStorage("settings", defaultContext.state.settings);

	const [state, setState] = useState({...defaultContext.state, settings});

	return <Provider value={{ state, setState, setSettings }}>{children}</Provider>;
};

export { store, StateProvider };
