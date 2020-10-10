import { PrivmsgMessage } from "dank-twitch-irc";
import React from "react";
import { useChat } from "../chat/useChat";

export function Split(props: {channel: string}): JSX.Element {
    const messages = useChat(props.channel);

    return <div>
        {messages.map((message: PrivmsgMessage) => <div key={message.messageID}>{message.messageText}</div>)}
    </div>;
}