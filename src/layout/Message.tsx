import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import Linkify from "react-linkify";
import styled from "styled-components";
import { ThirdPartyEmote } from "../types/ThirdPartyEmote";
import { User } from "./User";

const MessageContainer = styled.div`
	margin: 0 0;
	min-height: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Emote = styled.img`
	margin: 0 3px;
`;

export const Message = React.memo(function Message({ message, thirdPartyEmotes }: { message: PrivmsgMessage, thirdPartyEmotes: Array<ThirdPartyEmote> }): JSX.Element {

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
			if (c !== " " && x !== message.messageText.length) {
				buffer += c;
				continue;
			}
			let emoteFound = false;

			for (const emote of thirdPartyEmotes) {
				if (buffer.trim() === emote.code) {
					renderMessage.push(<Emote
						key={x}
						alt={emote.code}
						src={emote.urls.small}
					/>);
					emoteFound = true;
					buffer = "";

					break;
				}
			}

			if (!emoteFound) {
				renderMessage.push(<Linkify key={x} componentDecorator={(decoratedHref, decoratedText, key) => (
					<a target="__blank" href={decoratedHref} key={key}>
						{decoratedText}
					</a>
				)}>{buffer}</Linkify>);
				buffer = "";
			}
			renderMessage.push(c);
		}
	}

	return <MessageContainer>
		<User displayName={message.displayName} color={message.colorRaw} /> {renderMessage}
	</MessageContainer>;
}, () => true);