import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {useDispatch} from "react-redux"
import {EuiSelectableTemplateSitewide, EuiSelectableTemplateSitewideOption} from "@elastic/eui"
import HomeSlice from "../../../redux/home/slice"

export const FulSearch: React.FC = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const [searchRef, setSearchRef] = useState<HTMLInputElement | null>(null)

    const onChange = (updatedOptions: EuiSelectableTemplateSitewideOption[]) => {
        const clickedItem = updatedOptions.find(
            (option) => option.checked === 'on'
        )
        if (!clickedItem) return
    }

    const onKeyUpCapture = (e: any) => {
        if (e.key.toLowerCase() === "enter") {
            console.log(e.key)
            dispatch(HomeSlice.actions.filterSearch(e.currentTarget.value))
        }
    }

    // const hotkey= "⌘K"
    return (
        <EuiSelectableTemplateSitewide
            emptyMessage={t('home.emptySearch')}
            isLoading={false}
            onChange={onChange}
            options={[]}
            searchProps={{
                append: '➥',
                onKeyUpCapture: onKeyUpCapture,
                className: 'customSearchClass',
                inputRef: setSearchRef,
            }}
            listProps={{
                className: 'customListClass',
            }}
        />
    )
}