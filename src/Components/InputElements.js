import React from 'react'
import { useField } from 'formik'

export const CustomeInput = ({ ...props }) => {
    const [filed, meta] = useField(props)
    return (
        <div>
            <input {...filed} {...props} />
            {meta.touched && meta.error ? (
                <div className='text-danger'>{meta.error}</div>
            ) : null}
        </div>
    )
}
