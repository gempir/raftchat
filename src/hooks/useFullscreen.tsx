import { useState, useEffect } from "react";

declare global {
	interface Document {
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitFullscreenElement?: Element;
	}

	interface HTMLElement {
		msRequestFullscreen?: () => Promise<void>;
		mozRequestFullScreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
	}
}

export function isFullScreenElement(el: HTMLElement): boolean {
	if (el && el) {
		return Boolean(
			document.fullscreenElement === el ||
			document.mozFullScreenElement === el ||
			document.webkitFullscreenElement === el ||
			document.msFullscreenElement === el,
		);
	}

	return Boolean(
		document.fullscreenElement ||
		document.mozFullScreenElement ||
		document.webkitFullscreenElement ||
		document.msFullscreenElement
	);
}

export function useFullScreen(element: HTMLElement): [boolean, () => void] {
	const initialState = isFullScreenElement(element);
	const [fullScreen, setFullScreen] = useState(initialState);

	// access various open fullscreen methods
	const openFullScreen = () => {
		const el = (element && element) || document.documentElement;

		if (el.requestFullscreen) return el.requestFullscreen();
		if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
		if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
		if (el.msRequestFullscreen) return el.msRequestFullscreen();
	};

	// access various exit fullscreen methods
	const closeFullScreen = () => {
		if (document.exitFullscreen) return document.exitFullscreen();
		if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
		if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
		if (document.msExitFullscreen) return document.msExitFullscreen();
	};

	useEffect(() => {
		function handleChange() {
			setFullScreen(isFullScreenElement(element));
		}

		document.addEventListener("webkitfullscreenchange", handleChange, false);
		document.addEventListener("mozfullscreenchange", handleChange, false);
		document.addEventListener("msfullscreenchange", handleChange, false);
		document.addEventListener("MSFullscreenChange", handleChange, false); // IE11
		document.addEventListener("fullscreenchange", handleChange, false);

		return () => {
			document.removeEventListener("webkitfullscreenchange", handleChange);
			document.removeEventListener("mozfullscreenchange", handleChange);
			document.removeEventListener("msfullscreenchange", handleChange);
			document.removeEventListener("MSFullscreenChange", handleChange);
			document.removeEventListener("fullscreenchange", handleChange);
		};
	}, [element]);

	return [fullScreen, fullScreen ? closeFullScreen : openFullScreen];
}