import React from 'react';
import {useIcon} from "./hooks/useIcon";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import '@elastic/eui/dist/eui_theme_dark.css';
import {EuiPageContentBody, EuiPageTemplate, EuiText, EuiProvider} from '@elastic/eui';
import {DataApe, DataPage, HomePage, Table} from "./pages"
import "./App.scss"

function App() {
    useIcon()

    return (
        <EuiProvider colorMode="dark">
        <div className="App">
            <BrowserRouter>
                <EuiPageTemplate
                    style={{minHeight: "86vh"}}
                    id={"mainContent"}
                    restrictWidth="75%">
                    <EuiPageContentBody>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}></Route>
                            <Route path={"/home"} element={<div/>}></Route>
                            <Route path={"/about"} element={<div/>}></Route>
                            <Route path={"*"} element={<div>施工中......</div>}></Route>
                        </Routes>
                    </EuiPageContentBody>
                </EuiPageTemplate>
            </BrowserRouter>
        </div>
        </EuiProvider>
    );
}

export default App;
