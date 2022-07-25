import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {desktopDir} from "@tauri-apps/api/path"
import {readTextFile} from "@tauri-apps/api/fs"


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
    errMessage: string | undefined,
    pagination: {
        count: number,
        page: number,
        current_page : number,
        per_page: number,
    } | undefined
}

const initialState: HomeStateType = {
    loaded: false,
    onetabGroups: [],
    errMessage: undefined,
    pagination: undefined
}

export const readJson = createAsyncThunk(
    "home/read_file",
    async () => {
        const desktopPath = await desktopDir();
        const oriStr = await readTextFile(`${desktopPath}/download/onetab.json`)
        const str = JSON.parse(oriStr)
        return JSON.parse(str).tabGroups
    }
)

export type thunkType = typeof readJson

export const HomeSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        init: (state: HomeStateType, action) => {
            console.log(action)
        },
        nextPage: (state: HomeStateType, action) => {
            if((typeof action.payload) === "number") {
                state.pagination!.current_page = action.payload
            }else{
                state.pagination!.current_page++
            }
        },
        changePerPage: (state: HomeStateType, action) => {
            state.pagination = {
                count: action.payload.length,
                page: Math.ceil(action.payload.length/action.payload),
                current_page: 0,
                per_page: action.payload,
            }
        }
    },
    extraReducers: {
        [readJson.pending.type]: (state) => {
            state.loaded = false
        },
        [readJson.rejected.type]: (state) => {
            state.loaded = false
            state.errMessage = "加载失败"
        },
        [readJson.fulfilled.type]: (state, action) => {
            // console.log(action.payload)
            state.onetabGroups = action.payload
            state.pagination = {
                count: action.payload.length,
                page: Math.ceil(action.payload.length/10),
                current_page: 0,
                per_page: 10,
            }
            state.loaded = true
        }
    }
})

export default HomeSlice