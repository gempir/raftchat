import { ChatClient } from "dank-twitch-irc";
import React, { createContext, useState } from "react";

export interface State {
    chatClient: ChatClient,
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
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setState: (state: State) => { },
};
const store = createContext(defaultContext);
const { Provider } = store;

const StateProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [state, setState] = useState(defaultContext.state);

	return <Provider value={{ state, setState }}>{children}</Provider>;
};

export { store, StateProvider };