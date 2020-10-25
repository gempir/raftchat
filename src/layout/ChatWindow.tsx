import { Button, InputGroup, Tooltip } from "@blueprintjs/core";
import { PrivmsgMessage } from "dank-twitch-irc";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useChat } from "../chat/useChat";
import { useThirdPartyEmotes } from "../hooks/useThirdPartyEmotes";
import { createRandomString } from "../services/createRandomString";
import { store } from "../state/Store";
import { Message } from "./Message";

const ChatWindowContainer = styled.div`
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

export function ChatWindow(props: { channel?: string, id: string }): JSX.Element {
	if (!props.channel) {
		return <EmptyChatWindow id={props.id} />;
	}

	return <ChannelChatWindow channel={props.channel} />;
}

function ChannelChatWindow(props: { channel: string }): JSX.Element {
	const messages = useChat(props.channel);
	const channelId = messages.length > 0 ? messages[0].channelID : "";
	const thirdPartyEmotes = useThirdPartyEmotes(channelId);

	return <ChatWindowContainer>
		<MessageScroll>
			{messages.map((message: PrivmsgMessage) => <li key={message.messageID}><Message message={message} thirdPartyEmotes={thirdPartyEmotes} /></li>)}
		</MessageScroll>
	</ChatWindowContainer>;
}

function EmptyChatWindow({ id }: { id: string }): JSX.Element {
	const { state, setState } = useContext(store);
	const [channel, setChannel] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (e.target instanceof HTMLFormElement) {
			const newState = { ...state, channels: { ...state.channels, [id]: channel } };
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