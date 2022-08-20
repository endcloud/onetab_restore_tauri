import React, {useEffect, useState} from 'react'
import {useIcon} from "./hooks/useIcon"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import '@elastic/eui/dist/eui_theme_dark.css'
import {EuiPageContentBody, EuiPageTemplate, EuiProvider} from '@elastic/eui'
import {DatePicker, FulSearch, HomePage} from "./pages"
import "./App.scss"
import createCache from "@emotion/cache"
import {appWindow} from "@tauri-apps/api/window"
import {useSelector} from "./redux/hooks"
import {useDisable} from "./hooks/useDisable"

function App() {
    useIcon()
    useDisable()

    const state = useSelector((state) => state.home)
    const [dark, setDark] = useState(false)

    const setTheme = async() => {
        // const theme = await appWindow.theme() // todo-亮色有点问题, 待解决
        const theme = "dark"
        setDark(theme! === "dark")
    }
    useEffect(() => {
        setTheme()
    }, [])

    const cache = createCache({
        key: 'main',
        // @ts-ignore
        container: document.querySelector('meta[name="emotion-styles"]'),
    });
    cache.compat = true;

    return (
        <EuiProvider cache={cache} colorMode={dark ? "dark" : "light"}>
            <div className="App">
            <BrowserRouter>
                <EuiPageTemplate
                    style={{minHeight: "86vh"}}
                    id={"mainContent"}
                    restrictWidth="75%"
                    pageHeader={{
                        rightSideItems: state.onetabGroups.length > 0 ? [<DatePicker/>, <FulSearch/>] : [],
                        description: '',
                    }}
                >
                    <EuiPageContentBody>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}></Route>
                            <Route path={"/home"} element={<div/>}></Route>
                            <Route path={"/about"} element={<div>施工中......</div>}></Route>
                            <Route path={"*"} element={<div>404 Not Found</div>}></Route>
                        </Routes>
                    </EuiPageContentBody>
                </EuiPageTemplate>
            </BrowserRouter>
        </div>
        </EuiProvider>
    )
}

export default App
