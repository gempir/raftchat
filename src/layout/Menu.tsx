import React from "react";
import styled from "styled-components";
import { colors } from "../variables/colors";

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 2rem;
    background: ${colors.bgBright}
`;

export function Menu(): JSX.Element {
	return <MenuContainer>
        Settings
	</MenuContainer>;
}