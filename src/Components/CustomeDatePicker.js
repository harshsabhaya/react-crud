import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function CustomeDatePicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                defaultValue={props.defaultValue ? dayjs(new Date(props.defaultValue)) : null}
                onChange={(newValue) => props.onChange(props.name, newValue)}
            />
        </LocalizationProvider>
    );
}