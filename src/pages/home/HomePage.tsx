import React, {useEffect} from "react"
import {useSelector} from "../../redux/hooks"
import {useDispatch} from "react-redux"
import {checkUpdate, HomeSlice, readJson} from "../../redux/home/slice"
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiLoadingContent,
    EuiPagination,
    EuiRadio,
    EuiSpacer,
    EuiText,
    EuiTitle
} from "@elastic/eui"
import {TabGroup} from "../data"
import {useTranslation} from "react-i18next"
import { message } from '@tauri-apps/api/dialog';


export const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const state = useSelector((state) => state.home)
    const dispatch = useDispatch()

    const dialog = async() => {
        await message(t('home_page.error_tip'), { title: 'Tip', type: 'error' })
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(checkUpdate())
        try{
            // @ts-ignore
            dispatch(readJson())
        }catch (e) {
            dialog()
        }
    }, [])

    const changeItemsPerPage = (pageSize: number) => {
        dispatch(HomeSlice.actions.changePerPage(pageSize))
        // document.getElementById("mainTable")!.scrollTo({top: 0, behavior: "smooth"})
        window.scrollTo(0, 0)
    }

    const gotoPage = (index: number) => {
        dispatch(HomeSlice.actions.nextPage(index))
        window.scrollTo(0, 0)
    }

    const pagination = (id: string) => (
        <EuiFlexGroup
            id={id}
            justifyContent="spaceBetween"
            alignItems="center"
            responsive={true}
            wrap
        >
            <EuiFlexItem grow={false}>
                <EuiFlexGroup
                    justifyContent="flexStart"
                    alignItems="flexStart"
                    responsive={false}
                    wrap
                >
                    <EuiFlexItem grow={false}>
                        <EuiText size="s"><span>{t("home_page.per_page_tab_group_num")}</span></EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiRadio
                            id={"#10"}
                            label="10"
                            checked={state.pagination?.per_page === 10}
                            onChange={(e) => {
                                changeItemsPerPage(10)
                            }}
                        />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiRadio
                            id={"#20"}
                            label="20"
                            checked={state.pagination?.per_page === 20}
                            onChange={(e) => {
                                changeItemsPerPage(20)
                            }}
                        />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiRadio
                            id={"#30"}
                            label="30"
                            checked={state.pagination?.per_page === 30}
                            onChange={(e) => {
                                changeItemsPerPage(30)
                                console.log(e)
                            }}
                        />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
                <EuiPagination
                    aria-label="view pagination"
                    pageCount={state.pagination?.page}
                    activePage={state.pagination?.current_page}
                    onPageClick={(activePage) => {
                        gotoPage(activePage)
                    }}
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    )

    return (
        <div>
            {
                state.loaded ? (
                    (typeof state.errMessage) === "undefined" ? (
                        <div id={"mainTable"}>
                            {pagination("pagination-top")}
                            <EuiSpacer size="l"/>
                            {
                                state.showGroups
                                    .slice(state.pagination!.per_page * state.pagination!.current_page,
                                        state.pagination!.per_page * state.pagination!.current_page + state.pagination!.per_page)
                                    .map((group, index) => {
                                        // console.log(group)
                                        return <TabGroup id={group.id} time={group.createDate} items={group.tabsMeta} key={`rc-${group.id}`}/>
                                    })
                            }
                            <EuiSpacer size="l"/>
                            {pagination("pagination-down")}
                        </div>
                    ) : (
                        <EuiTitle>
                            <span>
                                {state.errMessage}
                            </span>
                        </EuiTitle>
                    )
                ) : (
                    <EuiLoadingContent lines={10}/>
                )
            }
        </div>
    )
}