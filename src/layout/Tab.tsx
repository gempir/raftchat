import React from "react";
import styled from "styled-components";
import { Split } from "./Split";

const TabContainer = styled.div`
	flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export function Tab(): JSX.Element {
	return <TabContainer>
		<Split channel={"gempir"} />
	</TabContainer>;
}