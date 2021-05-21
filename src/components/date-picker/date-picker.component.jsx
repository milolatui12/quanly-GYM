import React from 'react';

import './date-picker.styles.scss';

const DatePicker = ({ handleChange }) => {
    return (
        <div className="date-picker">
            <div>
                <label>Từ ngày </label>
                <input onChange={handleChange} type="date" name="start" />
            </div>
            <div>
                <label>Đến ngày </label>
                <input onChange={handleChange} type="date" name="end" />
            </div>
        </div>
    )
};

export default DatePicker;