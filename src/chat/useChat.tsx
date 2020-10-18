import { PrivmsgMessage } from "dank-twitch-irc";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../state/useStore";

export function useChat(channel: string, bufferSize = 100): Array<PrivmsgMessage> {
	const { chatClient } = useStore();

	const [messages, setMessages] = useState<Array<PrivmsgMessage>>([]);

	const handleMessage =  useCallback((message: PrivmsgMessage) => {
		if (message.channelName === channel) {
			const newMessages = [...messages];
			if ((newMessages.length + 1) === bufferSize) {
				newMessages.pop();
			}
			newMessages.unshift(message);

			setMessages(newMessages);
		}
	}, [bufferSize, channel, messages]);

	useEffect((): () => void => {
		if (channel === "") {
			return () => {
				// do nothing
			};
		}
		chatClient.join(channel);
		chatClient.on("PRIVMSG", handleMessage);

		return () => chatClient.removeListener("PRIVMSG", handleMessage);
	}, [channel, chatClient, bufferSize, handleMessage]);

	return messages;
}