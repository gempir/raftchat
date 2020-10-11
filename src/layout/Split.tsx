import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import styled from "styled-components";
import { useChat } from "../chat/useChat";

const SplitContainer = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    overflow-y: scroll;
`;

export function Split(props: {channel: string}): JSX.Element {
	const messages = useChat(props.channel);

	return <SplitContainer>
		{messages.map((message: PrivmsgMessage) => <li key={message.messageID}>{message.messageText}</li>)}
	</SplitContainer>;
}