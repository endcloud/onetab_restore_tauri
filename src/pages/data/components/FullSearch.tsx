import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {useDispatch} from "react-redux"
import {EuiFieldSearch} from "@elastic/eui"
import HomeSlice from "../../../redux/home/slice"
import {useSelector} from "../../../redux/hooks"

export const FulSearch: React.FC = () => {
    const {t} = useTranslation()
    const state = useSelector((state) => state.home)
    const dispatch = useDispatch()


    const [searchText, setSearchText] = useState("")

    // const [searchRef, setSearchRef] = useState<HTMLInputElement | null>(null)
    // const onChangeFull = (updatedOptions: EuiSelectableTemplateSitewideOption[]) => {
    //     const clickedItem = updatedOptions.find(
    //         (option) => option.checked === 'on'
    //     )
    //     if (!clickedItem) return
    // }
    //
    // const onKeyUpCapture = (e: any) => {
    //     if (e.key.toLowerCase() === "enter") {
    //         console.log(e.key)
    //         dispatch(HomeSlice.actions.filterSearch(e.currentTarget.value))
    //     }
    // }

    const onChange = (e: any) => {
        console.log(e)
        setSearchText(e.currentTarget.value)
    }
    const onEnterSearch = () => {
        dispatch(HomeSlice.actions.filterSearch(searchText))
    }

    // const hotkey= "⌘K"
    return (
        <EuiFieldSearch
            onBlur={onEnterSearch}
            placeholder={t('home_page.emptySearch')}
            value={searchText}
            onSearch={onEnterSearch}
            onChange={onChange}
            isClearable={state.filter.search.length > 0}
            aria-label="Search Field"
        />
    )
}