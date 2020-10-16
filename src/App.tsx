import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React, { useContext, useEffect } from "react";
import { Mosaic } from "react-mosaic-component";
import styled from "styled-components";
import { ChatWindow } from "./layout/ChatWindow";
import { Menu } from "./layout/Menu";
import { store } from "./state/Store";
import { Classes } from "@blueprintjs/core/lib/esm/common";

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
	a: <ChatWindow channel={"nymn"} />,
	b: <ChatWindow channel={"pokimane"} />,
	c: <ChatWindow channel={"gempir"} />,
};

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

	.mosaic-tile {
		margin: 0;
	}
`;

export function App(): JSX.Element {
	const { state } = useContext(store);

	useEffect(() => {
		state.chatClient.connect();
	}, [state.chatClient]);

	return (
		<AppContainer>
			<Menu />
			<Mosaic<string>
				className={`mosaic-blueprint-theme ${Classes.DARK}`}
				renderTile={(id) => ELEMENT_MAP[id]}
				initialValue={{
					direction: "row",
					first: "a",
					second: {
						direction: "column",
						first: "b",
						second: "c",
					},
					splitPercentage: 40,
				}}
			/>
		</AppContainer>
	);
}
