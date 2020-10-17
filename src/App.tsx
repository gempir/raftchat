import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React, { useContext, useEffect } from "react";
import { Mosaic, MosaicWindow } from "react-mosaic-component";
import styled from "styled-components";
import { ChatWindow } from "./layout/ChatWindow";
import { Menu } from "./layout/Menu";
import { store } from "./state/Store";
import { Classes } from "@blueprintjs/core/lib/esm/common";

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

	.mosaic-window-body {
		padding: 5px;
	}
`;

export function App(): JSX.Element {
	const { state } = useContext(store);

	useEffect(() => {
		state.chatClient.connect();
	}, [state.chatClient]);

	return (
		<AppContainer className={`mosaic-blueprint-theme ${Classes.DARK}`}>
			<Menu />
			<Mosaic<string>
				className={`mosaic-blueprint-theme ${Classes.DARK}`}
				renderTile={(id, path) => 
					<MosaicWindow<string> path={path} createNode={() => "new"} title={id}>
						<ChatWindow channel={id} />
					</MosaicWindow>
				}
				initialValue={state.settings}
			/>
		</AppContainer>
	);
}
