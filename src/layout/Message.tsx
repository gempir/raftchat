import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import styled from "styled-components";
import { User } from "./User";

const MessageContainer = styled.div`
	margin: 0 0;
	min-height: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Emote = styled.img`
	margin: 0;
`;

export function Message({ message }: { message: PrivmsgMessage }): JSX.Element {

	const renderMessage = [];

	let replaced;
	let buffer = "";

	for (let x = 0; x <= message.messageText.length; x++) {
		const c = message.messageText[x];

		replaced = false;
		for (const emote of message.emotes) {
			if (emote.startIndex === x) {
				replaced = true;
				renderMessage.push(<Emote
					key={x}
					alt={emote.code}
					src={`https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`}
				/>);
				x += emote.endIndex - emote.startIndex - 1;
				break;
			}
		}

		if (!replaced) {
			if (c !== " " && x !== message.messageText.length - 1) {
				buffer += c;
				continue;
			}
			renderMessage.push(buffer);
			buffer = "";
			renderMessage.push(c);
		}
	}

	return <MessageContainer>
		<User displayName={message.displayName} color={message.colorRaw} /> {renderMessage}
	</MessageContainer>;
}