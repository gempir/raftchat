import { Button } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import { useFullScreen } from "../hooks/useFullscreen";

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 2rem;
	justify-content: space-between;
`;

export function Menu(): JSX.Element {
	const [, toggleFullscreen] = useFullScreen(document.body);

	return <MenuContainer>
		Settings
    
		<Button icon="fullscreen" onClick={toggleFullscreen}/>
	</MenuContainer>;
}