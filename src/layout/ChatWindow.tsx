import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import styled from "styled-components";
import { useChat } from "../chat/useChat";
import { Message } from "./Message";

const ChatWindowContainer = styled.div`
	flex-grow: 1;
    display: flex;
    flex-direction: column;
	height: 100%;
`;

const MessageScroll = styled.ul`
    list-style-type: none;
    flex-grow: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	display: flex;
	flex-direction: column-reverse;

	&::-webkit-scrollbar {
		width: 0px;
	}
	
	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: transparent;
	}
`;

export function ChatWindow(props: { channel: string }): JSX.Element {
	const messages = useChat(props.channel);

	return <ChatWindowContainer>
		<MessageScroll>
			{messages.map((message: PrivmsgMessage) => <li key={message.messageID}><Message message={message} /></li>)}
		</MessageScroll>
	</ChatWindowContainer>;
}