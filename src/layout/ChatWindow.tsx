import { Button, InputGroup, Tooltip } from "@blueprintjs/core";
import { PrivmsgMessage } from "dank-twitch-irc";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { useChat } from "../chat/useChat";
import { useThirdPartyEmotes } from "../hooks/useThirdPartyEmotes";
import { store } from "../state/Store";
import { Message } from "./Message";

const ChatWindowContainer = styled.div`
	position: relative;
	flex-grow: 1;
    display: flex;
    flex-direction: column;
	height: 100%;
`;

const NoChatWindowContainer = styled.div`
    display: flex;
	align-items: center;
    justify-content: center;
	height: 100%;
`;

const ScrollToBottomButton = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 5px;
	text-align: center;
	cursor: pointer;
	user-select: none;
	width: 100%;
	background: rgba(0, 0, 0, 0.75);

	&:hover {
		background: rgba(50, 50, 50, 0.75);
	}
`;

const MessageScroll = styled.ul`
    list-style-type: none;
    flex-grow: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	display: flex;
	flex-direction: column-reverse;

	li {
		padding: 0 5px;
	}

	li:first-child {
		padding-bottom: 5px
	}

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

export function ChatWindow(props: { channel?: string, id: string }): JSX.Element {
	if (!props.channel) {
		return <EmptyChatWindow id={props.id} />;
	}

	return <ChannelChatWindow channel={props.channel} />;
}

function ChannelChatWindow(props: { channel: string }): JSX.Element {
	const messages = useChat(props.channel);
	const messageScrollRef = useRef<HTMLUListElement>(null);
	const [showScrollToBottom, setShowScrollToBottom] = useState(false);
	const channelId = messages.length > 0 ? messages[0].channelID : "";
	const thirdPartyEmotes = useThirdPartyEmotes(channelId);

	const scrollToBottom = () => {
		if (messageScrollRef.current !== null) {
			messageScrollRef.current.scrollTop = 0;
		}
	};

	const scrollHandler = (e: React.UIEvent<HTMLUListElement>): void => {
		const chatWindow = e.target as HTMLUListElement;

		if (chatWindow.scrollTop < 0) {
			setShowScrollToBottom(true);
		} else {
			setShowScrollToBottom(false);
		}
	};

	return <ChatWindowContainer>
		<MessageScroll onScroll={scrollHandler} ref={messageScrollRef}>
			{messages.map((message: PrivmsgMessage) => <li key={message.messageID}><Message message={message} thirdPartyEmotes={thirdPartyEmotes} /></li>)}
		</MessageScroll>
		{showScrollToBottom && <ScrollToBottomButton onClick={scrollToBottom}>Scroll To Bottom</ScrollToBottomButton>}
	</ChatWindowContainer>;
}

function EmptyChatWindow({ id }: { id: string }): JSX.Element {
	const { state, setState } = useContext(store);
	const [channel, setChannel] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (e.target instanceof HTMLFormElement) {
			const newState = { ...state, channels: { ...state.channels, [id]: channel.toLowerCase() } };
			if (state.settings === null) {
				newState.settings = id;
			}
			setState(newState);
		}
	};

	const submitButton = (
		<Tooltip content={"Join"}>
			<Button
				icon={"chat"}
				type="submit"
				minimal={true}
			/>
		</Tooltip>
	);

	return <NoChatWindowContainer>
		<form onSubmit={handleSubmit}>
			<InputGroup
				placeholder="channel"
				name="channel"
				value={channel}
				onChange={(e: React.FormEvent<HTMLElement>) => setChannel((e.target as HTMLInputElement).value)}
				large
				rightElement={submitButton}
				type={"text"}
			/>
		</form>
	</NoChatWindowContainer>;
}