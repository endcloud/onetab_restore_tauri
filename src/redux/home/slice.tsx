import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {homeDir} from "@tauri-apps/api/path"
import {readTextFile} from "@tauri-apps/api/fs"
import {fetch} from "@tauri-apps/api/http"
import {confirm} from "@tauri-apps/api/dialog"
import config from '../../../package.json'


export interface OnetabItemType {
    id: string,
    url: string,
    title: string,
}

export interface OnetabGroupType {
    id: string,
    tabsMeta: OnetabItemType[],
    createDate: number,
}

export interface HomeStateType {
    loaded: boolean,
    onetabGroups: OnetabGroupType[],
    showGroups: OnetabGroupType[],
    errMessage: string | undefined,
    pagination: {
        count: number,
        page: number,
        current_page: number,
        per_page: number,
    } | undefined,
    filter: {
        search: string,
        date: string,
    },
}

const initialState: HomeStateType = {
    loaded: false,
    onetabGroups: [],
    showGroups: [],
    errMessage: undefined,
    pagination: undefined,
    filter: {
        search: "",
        date: ""
    }
}

export const readJson = createAsyncThunk(
    "home/read_file",
    async () => {
        // console.log(await desktopDir())
        // console.log(await localDataDir())
        // console.log(await appDir())
        // console.log(await homeDir())
        // console.log(await resourceDir())
        const str = await readTextFile(`${await homeDir()}tab_ori.json`)
        return JSON.parse(str).tabGroups
    }
)

export const checkUpdate = createAsyncThunk(
    "home/check_update",
    async () => {
        const res: any = await fetch("https://cos.endcloud.cn/onetabre", {
            method: 'GET',
            timeout: 10
        })
        if (!res || res.data.status !== 0) return

        console.log(res.data)

        const {time} = res.data
        const bundleTime = config.time
        if (time > bundleTime) {
            const isConfirm = await confirm("检测到新版本，是否前往发布地址？", {title: "更新提示", type: "info"})
            if (!isConfirm) return
            window.open(`https://github.com/endcloud/onetab_restore_tauri/releases`, "_blank")
        }
    }
)

export type thunkType = typeof readJson

const dataVerify = (state: HomeStateType) => {
    if (state.showGroups.length === 0) {
        state.errMessage = "No result found"
    } else {
        state.errMessage = undefined
    }

    state.pagination!.count = state.showGroups.length
    state.pagination!.page = Math.ceil(state.pagination!.count / state.pagination!.per_page)
    state.pagination!.current_page = 0
}


export const HomeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        init: (state: HomeStateType, action) => {
            console.log(action)
        },
        load: (state: HomeStateType, action) => {
            state.loaded = false
        },
        nextPage: (state: HomeStateType, action) => {
            if ((typeof action.payload) === "number") {
                state.pagination!.current_page = action.payload
            } else {
                state.pagination!.current_page++
            }
        },
        changePerPage: (state: HomeStateType, action) => {
            state.pagination!.page = Math.ceil(state.pagination!.count / action.payload)
            state.pagination!.current_page = 0
            state.pagination!.per_page = action.payload
        },
        filterSearch: (state: HomeStateType, action) => {
            if (action.payload === state.filter.search) return

            state.filter.search = action.payload

            state.showGroups = state.onetabGroups.filter(group => {
                return JSON.stringify(group.tabsMeta).toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
            })

            dataVerify(state)
        },
        filterDate: (state: HomeStateType, action) => {
            if (action.payload === state.filter.date) return

            state.filter.date = action.payload

            state.showGroups = action.payload === "" ? state.onetabGroups : state.onetabGroups.filter(group => new Date(group.createDate).toLocaleDateString() === action.payload)

            dataVerify(state)
        },
    },
    extraReducers: {
        [readJson.pending.type]: (state) => {
            state.loaded = false
        },
        [readJson.rejected.type]: (state, action) => {
            state.loaded = true
            state.errMessage = `加载失败\n${action.error.message}`
        },
        [readJson.fulfilled.type]: (state, action) => {
            // console.log(action.payload)
            state.onetabGroups = action.payload
            state.showGroups = action.payload
            state.pagination = {
                count: state.showGroups.length,
                page: Math.ceil(state.showGroups.length / 10),
                current_page: 0,
                per_page: 10,
            }
            state.loaded = true

        }
    }
})

export default HomeSlice