import React from "react"
import {OnetabItemType} from "../../../redux/home/slice"
import {EuiSpacer, EuiText, EuiTitle, EuiTextColor} from "@elastic/eui"
import {Table} from "../test2"

interface Props {
    time: number,
    items: OnetabItemType[]
}

const ts2time = (time = +new Date()): string => {
    const date = new Date(time + 8 * 3600 * 1000)
    return date.toJSON().slice(0, 19).replace('T', ' ').replace(/-/g, '.')
}

export const TabGroup = (props: Props) => {
    return (
        <div>
            <EuiTitle size="m">
                <EuiText>
                    {ts2time(props.time)}
                    <EuiTextColor color={"success"} style={{fontSize: "18px"}}>
                        &nbsp;&nbsp;有{props.items.length}个标签页
                    </EuiTextColor>
                </EuiText>
            </EuiTitle>


            <Table onetabItems={props.items}/>
            <EuiSpacer size="xl"/>
        </div>
    )
}