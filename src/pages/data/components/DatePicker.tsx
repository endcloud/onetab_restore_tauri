import React, {useState} from "react"
import moment from "moment/moment"
import {useDispatch} from "react-redux"
import {EuiDatePicker, EuiFormRow} from "@elastic/eui"
import HomeSlice from "../../../redux/home/slice"

export const DatePicker: React.FC = () => {
    const [startDate, setStartDate] = useState(moment())
    const dispatch = useDispatch()

    const handleChange = (date: moment.Moment) => {
        console.log(date)
        setStartDate(date)
    }
    const blur = () => {
        console.log("date_blur")
        const payload = !startDate ? "" : startDate.toDate().toLocaleDateString()
        console.log(payload)
        dispatch(HomeSlice.actions.filterDate(payload))
    }

    return (
        <EuiFormRow>
            <EuiDatePicker selected={startDate} onChange={handleChange} onBlur={blur}/>
        </EuiFormRow>
    )
}