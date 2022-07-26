import React from 'react'
import {EuiBasicTable, EuiLink} from '@elastic/eui'
import {OnetabItemType,} from "../../../redux/home/slice"

interface Props {
    id: string,
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
            id: `$tr-${id}`,
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
            id: `cell-${id}`,
            className: 'customCellClass',
            'data-test-subj': `cell-${id}-${field}`,
            textOnly: true,
        }
    }

    return (
        <div id={"div-"+props.id}>
            {
                <EuiBasicTable
                    id={props.id}
                    tableCaption="EuiBasicTable"
                    items={props.onetabItems}
                    rowHeader="title"
                    columns={columns}
                    rowProps={getRowProps}
                    cellProps={getCellProps}/>
            }
        </div>

    )
}



