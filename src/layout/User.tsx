import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
	display: inline-block;
	color: ${props => props.color};
	margin-right: 3px;
	font-weight: bold;
`;

export function User({ displayName, color }: { displayName: string, color: string }): JSX.Element {

	return <UserContainer color={color}>
		{displayName}:
	</UserContainer>;
}