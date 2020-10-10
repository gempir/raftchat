import React from "react";
import "./App.css";
import { Menu } from "./layout/Menu";
import { Tab } from "./layout/Tab";
import styled from "styled-components";

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export function App(): JSX.Element {
    return (
        <AppContainer className="App">
            <Menu />
            <Tab />
        </AppContainer>
    );
}
