import React, { useContext, useEffect } from "react";
import "./App.css";
import { Menu } from "./layout/Menu";
import { Tab } from "./layout/Tab";
import styled from "styled-components";
import { store } from "./state/Store";

const AppContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
`;

export function App(): JSX.Element {
	const {state} = useContext(store);

	useEffect(() => {
		state.chatClient.connect();
	}, [state.chatClient]);

	return (
		<AppContainer>
			<Menu />
			<Tab />
		</AppContainer>
	);
}
