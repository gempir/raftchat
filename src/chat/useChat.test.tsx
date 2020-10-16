import { renderHook } from "@testing-library/react-hooks";
import { ChatClient } from "dank-twitch-irc";
import { useChat } from "./useChat";

jest.mock("dank-twitch-irc");

test("should join chat", () => {
	const { result } = renderHook(() => useChat("gempir"));

	expect((ChatClient as jest.Mock).mock.instances[0].join.mock.calls[0][0]).toBe("gempir");
	expect(result.current.length).toBe(0);
});