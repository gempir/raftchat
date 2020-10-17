import { Button } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import { useFullScreen } from "../hooks/useFullscreen";

const MenuContainer = styled.div`
    display: flex;
	align-items: center;
	padding: 5px;
    width: 100%;
    height: 2rem;
	justify-content: space-between;

	.bp3-button {
		min-height: 0;
		min-width: 0;
	}
`;

export function Menu(): JSX.Element {
	const [, toggleFullscreen] = useFullScreen(document.body);

	return <MenuContainer>
		Settings
		<Button icon="refresh" intent={"primary"} />
		<Button icon="fullscreen" onClick={toggleFullscreen}/>
	</MenuContainer>;
}