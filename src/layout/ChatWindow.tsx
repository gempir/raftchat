import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import styled from "styled-components";
import { useChat } from "../chat/useChat";
import { colors } from "../variables/colors";
import { Message } from "./Message";

const TabContainer = styled.div`
	flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const SplitContainer = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    height: 0;
    min-height: 0;
    padding: 5px;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
	background: ${colors.bg};
    color: white;
	border: 1px solid black;
	padding: 10px;
    display: flex;
    flex-direction: column-reverse;
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
		width: 5px;
	}
	
	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${colors.bgDark};
		border-radius: 10px;
	}
`;

export function ChatWindow(props: { channel: string }): JSX.Element {
	const messages = useChat(props.channel);

	return <TabContainer>
		<SplitContainer>
			<Container>
				<MessageScroll>
					{messages.map((message: PrivmsgMessage) => <li key={message.messageID}><Message message={message} /></li>)}
				</MessageScroll>
			</Container>
		</SplitContainer>
	</TabContainer>;
}