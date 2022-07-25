import React from 'react'
import {formatDate, EuiBasicTable, EuiLink, EuiHealth} from '@elastic/eui'
import {OnetabItemType,} from "../../redux/home/slice"

interface Props {
    onetabItems: OnetabItemType[]
}

export const Table: React.FC<Props> = (props: Props) => {

    const columns = [
        {
            field: 'title',
            name: '',
            truncateText: true,
            sortable: true,
            'data-test-subj': 'titleCell',
            render: (name: string, item: OnetabItemType) => (
                <EuiLink href={item.url} target="_blank">
                    {name}
                </EuiLink>
            ),
            mobileOptions: {
                render: (item: OnetabItemType) => (
                    <EuiLink href={item.url} target="_blank">
                        {item.title}
                    </EuiLink>
                ),
                header: false,
                truncateText: false,
                enlarge: true,
                width: '100%',
            },
        }
    ]


    const getRowProps = (item: OnetabItemType) => {
        const {id} = item
        return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => {
                console.log(item)
            },
        }
    }

    const getCellProps = (item: OnetabItemType, column: any) => {
        const {id} = item
        const {field} = column
        return {
            className: 'customCellClass',
            'data-test-subj': `cell-${id}-${field}`,
            textOnly: true,
        }
    }

    return (
        <div>
            {
                <EuiBasicTable
                    tableCaption="Demo of EuiBasicTable"
                    items={props.onetabItems}
                    rowHeader="title"
                    columns={columns}
                    rowProps={getRowProps}
                    cellProps={getCellProps}/>
            }
        </div>

    )
}