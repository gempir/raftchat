import React from "react";
import styled from "styled-components";



const UserContainer = styled.div.attrs(props => ({
	style: {
		color: props.color,
	}
}))`
	display: inline-block;
	color: ${props => props.color};
	margin-right: 3px;
	font-weight: bold;
`;

export function User({ displayName, color }: { displayName: string, color: string }): JSX.Element {
	
	const renderColor = color !== "" ? color : "grey";

	return <UserContainer color={renderColor}>
		{displayName}:
	</UserContainer>;
}