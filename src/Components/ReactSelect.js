import React, { useState } from 'react';
import { useField } from 'formik'

import Select from 'react-select';
import Wrapper from '../Wrapper';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const ReactSelect = (props) => {
    const handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        props.onChange(props.name, value);
    };

    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        props.onBlur(props.name, true);
    };
    return (
        <Wrapper>
            <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                options={props.options || options}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
            />
            {!!props.error &&
                props.touched && (
                    <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
                )}
        </Wrapper>
    );
};

export default ReactSelect