import React, {useEffect, useState} from "react"
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {HomeSlice, readJson} from "../../redux/home/slice"
import {
    EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon,
    EuiHorizontalRule, EuiTitle, EuiCode, EuiSpacer, EuiStat,
    EuiLoadingContent, EuiHideFor, EuiPagination, EuiTablePagination,
    EuiButtonEmpty, EuiContextMenuItem, EuiPopover, EuiContextMenuPanel
} from "@elastic/eui";
import {TabGroup} from "../data/components/tabGroup"

export const HomePage: React.FC = () => {
    const state = useSelector((state) => state.home)
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(readJson())
    }, [dispatch])

    const changeItemsPerPage = (pageSize: number) => {
        dispatch(HomeSlice.actions.changePerPage(pageSize))
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const onButtonClick = () =>
        setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    const closePopover = () => setIsPopoverOpen(false);

    const getIconType = (size: number) => {
        return size === state.pagination!.per_page ? 'check' : 'empty';
    };

    const button = (
        <EuiButtonEmpty
            size="xs"
            color="text"
            iconType="arrowDown"
            iconSide="right"
            onClick={onButtonClick}
        >
            Rows per page: {state.pagination!.per_page}
        </EuiButtonEmpty>
    );

    const items = [
        <EuiContextMenuItem
            key="10 rows"
            icon={getIconType(10)}
            onClick={() => {
                closePopover();
                changeItemsPerPage(10);
            }}
        >
            10 rows
        </EuiContextMenuItem>,
        <EuiContextMenuItem
            key="20 rows"
            icon={getIconType(20)}
            onClick={() => {
                closePopover();
                changeItemsPerPage(20);
            }}
        >
            20 rows
        </EuiContextMenuItem>,
        <EuiContextMenuItem
            key="50 rows"
            icon={getIconType(50)}
            onClick={() => {
                closePopover();
                changeItemsPerPage(50);
            }}
        >
            50 rows
        </EuiContextMenuItem>,
    ];


    return (
        <div>
            {
                state.loaded ? (
                    <div>
                        {
                            state.onetabGroups.slice(10*state.pagination!.current_page, 10*state.pagination!.current_page+10).map((group, index) => {
                                // console.log(group)
                                return <TabGroup time={group.createDate} items={group.tabsMeta}/>
                            })
                        }
                        <EuiSpacer size="xl"/>
                        <EuiFlexGroup
                            justifyContent="spaceBetween"
                            alignItems="center"
                            responsive={false}
                            wrap
                        >
                            <EuiFlexItem grow={false}>
                                <EuiPopover
                                    button={button}
                                    isOpen={isPopoverOpen}
                                    closePopover={closePopover}
                                    panelPaddingSize="none"
                                >
                                    <EuiContextMenuPanel items={items} />
                                </EuiPopover>
                            </EuiFlexItem>

                            <EuiFlexItem grow={false}>
                                <EuiPagination
                                    aria-label="view pagination"
                                    pageCount={state.pagination!.page}
                                    activePage={state.pagination!.current_page}
                                    onPageClick={(activePage) => {
                                        dispatch(HomeSlice.actions.nextPage(activePage))
                                    }}
                                />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </div>
                ) : (
                    <EuiLoadingContent lines={10} />
                )
            }
        </div>
    )
}