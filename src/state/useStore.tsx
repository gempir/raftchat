import { useContext } from "react";
import { State, store } from "./Store";

export function useStore(): State {
	const {state} = useContext(store);

	return state;
}

export function useSetStore(): (state: State) => void {
	const {setState} = useContext(store);

	return setState;
}