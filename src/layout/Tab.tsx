import React from "react";
import styled from "styled-components";
import { Split } from "./Split";

const TabContainer = styled.div`
    display: flex;
    max-height: 100%;
`;

export function Tab(): JSX.Element {
	return <TabContainer>
		<Split channel={"xqcow"} />
	</TabContainer>;
}