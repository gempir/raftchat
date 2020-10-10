import React, { useContext, useEffect } from "react";
import "./App.css";
import { Menu } from "./layout/Menu";
import { Tab } from "./layout/Tab";
import styled from "styled-components";
import { store } from "./state/Store";

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export function App(): JSX.Element {
    const {state} = useContext(store);

    useEffect(() => {
        state.chatClient.connect();
    }, [state.chatClient]);

    return (
        <AppContainer>
            <Menu />
            <Tab />
        </AppContainer>
    );
}
