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
import { colors } from "./variables/colors";
import { ReactQueryCacheProvider } from "react-query";
import { createRandomString } from "./services/createRandomString";

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

	.mosaic-window-body {
		padding: 5px;
	}

	.mosaic.mosaic-blueprint-theme.bp3-dark {
		background: ${colors.bgDark};

		.mosaic-window-body {
			background: ${colors.bg};
		}

		.mosaic-window-toolbar {
			background: ${colors.bgBright};
		}

		.mosaic-window-toolbar.draggable:hover {
			background: ${colors.bgBrighter};
		}
	}
`;

export function App(): JSX.Element {
	const { state } = useContext(store);

	useEffect(() => {
		state.chatClient.connect();
	}, [state.chatClient]);

	// find a better soluton for this
	useEffect(() => {
		window.localStorage.setItem("channels", JSON.stringify(state.channels));
	}, [state.channels]);

	useEffect(() => {
		window.localStorage.setItem("settings", JSON.stringify(state.settings));
	}, [state.settings]);

	return (
		<ReactQueryCacheProvider queryCache={state.queryCache}>
			<AppContainer className={`mosaic-blueprint-theme ${Classes.DARK}`}>
				<Menu />
				<Mosaic<string>
					className={`mosaic-blueprint-theme ${Classes.DARK}`}
					renderTile={(id, path) =>
						<MosaicWindow<string> path={path} createNode={createRandomString} title={state.channels[id] ?? ""}>
							<ChatWindow channel={state.channels[id] ?? ""} id={id} />
						</MosaicWindow>
					}
					initialValue={state.settings}
				/>
			</AppContainer>
		</ReactQueryCacheProvider>
	);
}
