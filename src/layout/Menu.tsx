import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 2rem;
`;

export function Menu(): JSX.Element {
	return <MenuContainer>
        Settings
	</MenuContainer>;
}