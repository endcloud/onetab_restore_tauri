import React, {useEffect, useState} from 'react'
import {
    EuiBadge,
    EuiButton,
    EuiButtonIcon,
    EuiCheckbox,
    EuiContextMenuItem,
    EuiContextMenuPanel,
    EuiFieldSearch,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHealth,
    EuiIcon,
    EuiLink,
    EuiPopover,
    EuiScreenReaderOnly,
    EuiSpacer,
    EuiTable,
    EuiTableBody,
    EuiTableFooter,
    EuiTableFooterCell,
    EuiTableHeader,
    EuiTableHeaderCell,
    EuiTableHeaderCellCheckbox,
    EuiTableHeaderMobile,
    EuiTablePagination,
    EuiTableRow,
    EuiTableRowCell,
    EuiTableRowCellCheckbox,
    EuiTableSortMobile,
    LEFT_ALIGNMENT,
    Pager,
    RIGHT_ALIGNMENT,
    SortableProperties,
} from '@elastic/eui'


interface stateType {
    itemIdToSelectedMap: any,
    itemIdToOpenActionsPopoverMap: any,
    sortedColumn: string,
    itemsPerPage: number,
    firstItemIndex: number,
    lastItemIndex: number
}

interface itemType {
    id: number,
    title: string | object,
    type: string,
    dateCreated: string | JSX.Element,
    magnitude: number,
    health: JSX.Element,
}

export const DataPage: React.FC = () => {
    const stateInit: stateType = {
        itemIdToSelectedMap: {},
        itemIdToOpenActionsPopoverMap: {},
        sortedColumn: 'title',
        itemsPerPage: 10,
        firstItemIndex: 0,
        lastItemIndex: 0
    }
    const [state, setState] = useState(stateInit)

    const items: itemType[] = [
        {
            id: 0,
            title:
                'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
            type: 'user',
            dateCreated: 'Tue Dec 28 2016',
            magnitude: 1,
            health: <EuiBadge color="success">Healthy</EuiBadge>,
        },
        {
            id: 1,
            title: {
                value:
                    'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
                truncateText: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 01 2016',
            magnitude: 1,
            health: <EuiBadge color="success">Healthy</EuiBadge>,
        },
        {
            id: 2,
            title: (
                <span>
            A very long line in an ELEMENT which will wrap on narrower screens
            and NOT become truncated and replaced by an ellipsis
          </span>
            ),
            type: 'user',
            dateCreated: (
                <span>
            Tue Dec 01 2016 &nbsp; <EuiBadge color="accent">New!</EuiBadge>
          </span>
            ),
            magnitude: 10,
            health: <EuiBadge color="warning">Warning</EuiBadge>,
        },
        {
            id: 3,
            title: {
                value: (
                    <span>
              A very long line in an ELEMENT which will not wrap on narrower
              screens and instead will become truncated and replaced by an
              ellipsis
            </span>
                ),
                truncateText: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 16 2016',
            magnitude: 100,
            health: <EuiBadge color="success">Healthy</EuiBadge>,
        },
        {
            id: 4,
            title: {
                value: 'Dog',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 13 2016',
            magnitude: 1000,
            health: <EuiBadge color="warning">Warning</EuiBadge>,
        },
        {
            id: 5,
            title: {
                value: 'Dragon',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="success">Healthy</EuiBadge>,
        },
        {
            id: 6,
            title: {
                value: 'Bear',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="danger">Danger</EuiBadge>,
        },
        {
            id: 7,
            title: {
                value: 'Dinosaur',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="warning">Warning</EuiBadge>,
        },
        {
            id: 8,
            title: {
                value: 'Spider',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="warning">Warning</EuiBadge>,
        },
        {
            id: 9,
            title: {
                value: 'Bugbear',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="success">Healthy</EuiBadge>,
        },
        {
            id: 10,
            title: {
                value: 'Bear',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="danger">Danger</EuiBadge>,
        },
        {
            id: 11,
            title: {
                value: 'Dinosaur',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="warning">Warning</EuiBadge>,
        },
        {
            id: 12,
            title: {
                value: 'Spider',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiHealth color="success">Healthy</EuiHealth>,
        },
        {
            id: 13,
            title: {
                value: 'Bugbear',
                isLink: true,
            },
            type: 'user',
            dateCreated: 'Tue Dec 11 2016',
            magnitude: 10000,
            health: <EuiBadge color="danger">Danger</EuiBadge>,
        },
    ];

    const columns: any[] = [
        {
            id: 'checkbox',
            isCheckbox: true,
            textOnly: false,
            width: '32px',
        },
        {
            id: 'type',
            label: 'Type',
            isVisuallyHiddenLabel: true,
            alignment: LEFT_ALIGNMENT,
            width: '24px',
            cellProvider: (cell: any) => <EuiIcon type={cell} size="m"/>,
            mobileOptions: {
                show: false,
            },
        },
        {
            id: 'title',
            label: 'Title',
            footer: <em>Title</em>,
            alignment: LEFT_ALIGNMENT,
            isSortable: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            id: 'title_type',
            label: 'Title',
            mobileOptions: {
                only: true,
                header: false,
                enlarge: true,
                width: '100%',
            },
            render: (title: any, item: any) => (
                <span>
            <EuiIcon
                type={item.type}
                size="m"
                style={{verticalAlign: 'text-top'}}
            />{' '}
                    {title}
          </span>
            ),
        },
        {
            id: 'health',
            label: 'Health',
            footer: '',
            alignment: LEFT_ALIGNMENT,
        },
        {
            id: 'dateCreated',
            label: 'Date created',
            footer: 'Date created',
            alignment: LEFT_ALIGNMENT,
            isSortable: true,
        },
        {
            id: 'magnitude',
            label: 'Orders of magnitude',
            footer: ({items, pagination}: any) => {
                const {pageIndex, pageSize} = pagination;
                const startIndex = pageIndex * pageSize;
                const pageOfItems = items.slice(
                    startIndex,
                    Math.min(startIndex + pageSize, items.length)
                );
                return (
                    <strong>
                        Total: {pageOfItems.reduce((acc: any, cur: any) => acc + cur.magnitude, 0)}
                    </strong>
                );
            },
            alignment: RIGHT_ALIGNMENT,
            isSortable: true,
        },
        {
            id: 'actions',
            label: 'Actions',
            isVisuallyHiddenLabel: true,
            alignment: RIGHT_ALIGNMENT,
            isActionsPopover: true,
            width: '32px',
        },
    ]

    const sortableProperties: any = new SortableProperties(
        [
            {
                name: 'title',
                getValue: (item: any) => item.title.toLowerCase(),
                isAscending: true,
            },
            {
                name: 'dateCreated',
                getValue: (item) => item.dateCreated.toLowerCase(),
                isAscending: true,
            },
            {
                name: 'magnitude',
                getValue: (item) => item.magnitude.toLowerCase(),
                isAscending: true,
            },
        ],
        state.sortedColumn
    )

    const pager = new Pager(items.length, state.itemsPerPage);
    useEffect(() => {
        setState({...state, firstItemIndex: pager.getFirstItemIndex(), lastItemIndex: pager.getLastItemIndex()});
    }, [])
    

    const areAnyRowsSelected = () => {
        return (
            Object.keys(state.itemIdToSelectedMap).findIndex((id) => {
                return state.itemIdToSelectedMap[id]
            }) !== -1
        )
    }

    const areAllItemsSelected = () => {
        const indexOfUnselectedItem = items.findIndex(
            (item) => !isItemSelected(item.id)
        );
        return indexOfUnselectedItem === -1;
    };

    const isItemSelected = (itemId: any) => {
        return state.itemIdToSelectedMap[itemId];
    }

    const toggleAll = () => {
        const allSelected = areAllItemsSelected();
        const newItemIdToSelectedMap: any = {};
        items.forEach(
            (item) => (newItemIdToSelectedMap[item.id] = !allSelected)
        );

        setState({...state, itemIdToSelectedMap: newItemIdToSelectedMap});
    };

    const toggleItem = (itemId: any) => {
        setState((previousState: any) => {
            const newItemIdToSelectedMap = {
                ...previousState.itemIdToSelectedMap,
                [itemId]: !previousState.itemIdToSelectedMap[itemId],
            };

            return {
                ...previousState,
                itemIdToSelectedMap: newItemIdToSelectedMap,
            };
        });
    };


    const togglePopover = (itemId: any) => {
        setState((previousState: any) => {
            const newItemIdToOpenActionsPopoverMap: any = {
                ...previousState.itemIdToOpenActionsPopoverMap,
                // @ts-ignore
                [itemId]: !previousState.itemIdToOpenActionsPopoverMap[itemId],
            };

            return {
                ...previousState,
                itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
            };
        });
    };

    const closePopover = (itemId: any) => {
        // only update the state if this item's popover is open
        if (isPopoverOpen(itemId)) {
            setState((previousState: any) => {
                const newItemIdToOpenActionsPopoverMap = {
                    ...previousState.itemIdToOpenActionsPopoverMap,
                    [itemId]: false,
                };

                return {
                    ...previousState,
                    itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
                };
            });
        }
    };

    const isPopoverOpen = (itemId: any) => {
        return state.itemIdToOpenActionsPopoverMap[itemId];
    };

    const renderSelectAll = (mobile: boolean = false) => {
        return (
            <EuiCheckbox
                id={mobile ? 'selectAllCheckboxMobile' : 'selectAllCheckboxDesktop'}
                label={mobile ? 'Select all rows' : null}
                aria-label="Select all rows"
                title="Select all rows"
                checked={areAllItemsSelected()}
                //@ts-ignore
                onChange={toggleAll.bind(this)}
                type={mobile ? undefined : 'inList'}
            />
        )
    }

    const onSort = (prop: any) => {
        sortableProperties.sortOn(prop);
        setState({...state, sortedColumn: prop});
    };

    const getTableMobileSortItems = (): any => {
        const newItems: any[] = [];
        columns.forEach((column) => {
            if (column.isCheckbox || !column.isSortable) {
                return;
            }
            newItems.push({
                name: column.label,
                key: column.id,
                // @ts-ignore
                onSort: onSort.bind(this, column.id),
                isSorted: state.sortedColumn === column.id,
                isSortAscending: sortableProperties.isAscendingByName(column.id),
            });
        });
        return newItems.length ? newItems : null;
    }

    const renderHeaderCells = (): any => {
        const headers: any[] = [];

        columns.forEach((column, columnIndex) => {
            if (column.isCheckbox) {
                headers.push(
                    <EuiTableHeaderCellCheckbox key={column.id} width={column.width}>
                        {renderSelectAll()}
                    </EuiTableHeaderCellCheckbox>
                );
            } else if (column.isVisuallyHiddenLabel) {
                headers.push(
                    <EuiTableHeaderCell key={column.id} width={column.width}>
                        <EuiScreenReaderOnly>
                            <span>{column.label}</span>
                        </EuiScreenReaderOnly>
                    </EuiTableHeaderCell>
                );
            } else {
                headers.push(
                    <EuiTableHeaderCell
                        key={column.id}
                        align={columns[columnIndex].alignment}
                        width={column.width}
                        onSort={
                        // @ts-ignore
                            column.isSortable ? onSort.bind(this, column.id) : undefined
                        }
                        isSorted={state.sortedColumn === column.id}
                        isSortAscending={sortableProperties.isAscendingByName(
                            column.id
                        )}
                        mobileOptions={column.mobileOptions}
                    >
                        {column.label}
                    </EuiTableHeaderCell>
                );
            }
        });
        return headers.length ? headers : null;
    }

    const renderRows = (): any => {
        const renderRow = (item: any) => {
            const cells = columns.map((column) => {
                const cell = item[column.id];

                let child;

                if (column.isCheckbox) {
                    return (
                        <EuiTableRowCellCheckbox key={column.id}>
                            <EuiCheckbox
                                id={`${item.id}-checkbox`}
                                checked={isItemSelected(item.id)}
                                // @ts-ignore
                                onChange={toggleItem.bind(this, item.id)}
                                type="inList"
                                title="Select this row"
                                aria-label="Select this row"
                            />
                        </EuiTableRowCellCheckbox>
                    );
                }

                if (column.isActionsPopover) {
                    return (
                        <EuiTableRowCell
                            key={column.id}
                            // @ts-ignore
                            header={column.label}
                            textOnly={false}
                            hasActions={true}
                            align="right"
                        >
                            <EuiPopover
                                id={`${item.id}-actions`}
                                button={
                                    <EuiButtonIcon
                                        aria-label="Actions"
                                        iconType="gear"
                                        size="s"
                                        color="text"
                                        onClick={() => togglePopover(item.id)}
                                    />
                                }
                                isOpen={isPopoverOpen(item.id)}
                                closePopover={() => closePopover(item.id)}
                                panelPaddingSize="none"
                                anchorPosition="leftCenter"
                            >
                                <EuiContextMenuPanel
                                    items={[
                                        <EuiContextMenuItem
                                            key="A"
                                            icon="pencil"
                                            onClick={() => {
                                                closePopover(item.id);
                                            }}
                                        >
                                            Edit
                                        </EuiContextMenuItem>,
                                        <EuiContextMenuItem
                                            key="B"
                                            icon="share"
                                            onClick={() => {
                                                closePopover(item.id);
                                            }}
                                        >
                                            Share
                                        </EuiContextMenuItem>,
                                        <EuiContextMenuItem
                                            key="C"
                                            icon="trash"
                                            onClick={() => {
                                                closePopover(item.id);
                                            }}
                                        >
                                            Delete
                                        </EuiContextMenuItem>,
                                    ]}
                                />
                            </EuiPopover>
                        </EuiTableRowCell>
                    );
                }

                if (column.render) {
                    const titleText = item.title.truncateText
                        ? item.title.value
                        : item.title;
                    const title = item.title.isLink ? (
                        <EuiLink href="">{item.title.value}</EuiLink>
                    ) : (
                        titleText
                    );
                    child = column.render(title, item);
                } else if (column.cellProvider) {
                    child = column.cellProvider(cell);
                } else if (cell.isLink) {
                    child = <EuiLink href="">{cell.value}</EuiLink>;
                } else if (cell.truncateText) {
                    child = cell.value;
                } else {
                    child = cell;
                }

                return (
                    <EuiTableRowCell
                        key={column.id}
                        align={column.alignment}
                        truncateText={cell && cell.truncateText}
                        textOnly={cell ? cell.textOnly : true}
                        mobileOptions={{
                            header: column.label,
                            ...column.mobileOptions,
                        }}
                    >
                        {child}
                    </EuiTableRowCell>
                );
            });

            return (
                <EuiTableRow
                    key={item.id}
                    isSelected={isItemSelected(item.id)}
                    isSelectable={true}
                    hasActions={true}
                >
                    {cells}
                </EuiTableRow>
            );
        };

        const rows = [];

        for (
            let itemIndex = state.firstItemIndex;
            itemIndex <= state.lastItemIndex;
            itemIndex++
        ) {
            const item = items[itemIndex];
            rows.push(renderRow(item));
        }

        return rows;
    }

    const getColumnFooter = (column: any, {items, pagination}: any) => {
        if (column.footer === null) {
            return null;
        }

        if (column.footer) {
            if ((typeof column.footer) === "function") {
                return column.footer({items, pagination});
            }
            return column.footer;
        }

        return undefined;
    };
    const renderFooterCells = () => {
        const footers: any[] = [];

        const pagination = {
            pageIndex: pager.getCurrentPageIndex(),
            pageSize: state.itemsPerPage,
            totalItemCount: pager.getTotalPages(),
        };

        columns.forEach((column: any) => {
            const footer = getColumnFooter(column, {items, pagination});
            if (column.mobileOptions && column.mobileOptions.only) {
                return; // exclude columns that only exist for mobile headers
            }

            if (footer) {
                footers.push(
                    <EuiTableFooterCell
                        key={`footer_${column.id}`}
                        align={column.alignment}
                    >
                        {footer}
                    </EuiTableFooterCell>
                );
            } else {
                footers.push(
                    <EuiTableFooterCell
                        key={`footer_empty_${footers.length - 1}`}
                        align={column.alignment}
                    >
                        {undefined}
                    </EuiTableFooterCell>
                );
            }
        });
        return footers;
    }

    const onChangeItemsPerPage = (itemsPerPage: any) => {
        pager.setItemsPerPage(itemsPerPage);
        setState({
            ...state,
            itemsPerPage: itemsPerPage,
            firstItemIndex: pager.getFirstItemIndex(),
            lastItemIndex: pager.getLastItemIndex(),
        });
    };

    const onChangePage = (pageIndex: any) => {
        pager.goToPageIndex(pageIndex);
        setState({
            ...state,
            firstItemIndex: pager.getFirstItemIndex(),
            lastItemIndex: pager.getLastItemIndex(),
        });
    };


    let optionalActionButtons
    const exampleId = 'example-id'

    if (areAnyRowsSelected()) {
        optionalActionButtons = (
            <EuiFlexItem grow={false}>
                <EuiButton color="danger">Delete selected</EuiButton>
            </EuiFlexItem>
        )
    }


    return (
        <div>
            <EuiFlexGroup gutterSize="m">
                {optionalActionButtons}

                <EuiFlexItem>
                    <EuiFieldSearch fullWidth placeholder="Search..."/>
                </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="m"/>

            <EuiTableHeaderMobile>
                <EuiFlexGroup
                    responsive={false}
                    justifyContent="spaceBetween"
                    alignItems="baseline"
                >
                    <EuiFlexItem grow={false}>{renderSelectAll(true)}</EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiTableSortMobile items={getTableMobileSortItems()}/>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiTableHeaderMobile>

            <EuiTable id={exampleId}>
                <EuiTableHeader>{renderHeaderCells()}</EuiTableHeader>
                {/*@ts-ignore*/}
                <EuiTableBody>{renderRows()}</EuiTableBody>
                {/*@ts-ignore*/}
                <EuiTableFooter>{renderFooterCells()}</EuiTableFooter>
            </EuiTable>

            <EuiSpacer size="m"/>

            <EuiTablePagination
                aria-label="Custom EuiTable demo"
                aria-controls={exampleId}
                activePage={pager.getCurrentPageIndex()}
                itemsPerPage={state.itemsPerPage}
                itemsPerPageOptions={[5, 10, 20]}
                pageCount={pager.getTotalPages()}
                onChangeItemsPerPage={onChangeItemsPerPage}
                onChangePage={onChangePage}
                compressed
            />
        </div>
    )
}
