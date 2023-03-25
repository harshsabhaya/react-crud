import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Wrapper from '../Wrapper'
import { CustomeInput } from './InputElements'
import ReactSelect from './ReactSelect'
import CustomeDatePicker from './CustomeDatePicker'
import Slider from '@mui/material/Slider';
import { SketchPicker } from 'react-color';
import { PASS_OFF, PASS_ON, UPLOAD_IMG } from '../config'
import { useRef } from 'react'
import PreviewImage from './PreviewImage'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUser, updateUser } from '../actions/user'
import Switch from '@mui/material/Switch';
import IndianStates from '../JsonData/IndianStates.json'
import IndianCities from '../JsonData/IndianCities.json'

// const DEFAULT_VALUES = {
//     firstName: "Harsh Sabhaya",
//     password: "hello@1212",
//     email: "harsh@gmail.com",
//     state: { value: 'chocolate', label: 'Chocolate' },
//     city: { value: 'chocolate', label: 'Chocolate' },
//     date: "3/25/23",
//     age: 23,
//     address: "Janta Apart",
//     attachment: null,
//     color: {},
//     status: false
// }

const latinCharsRegEx = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s\'\-]*)$/gi;
const passwordRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

const DEFAULT_VALUES = {
    firstName: "",
    password: "",
    email: "",
    state: { value: '', label: '' },
    city: { value: '', label: '' },
    date: "",
    age: 0,
    address: "",
    attachment: null,
    color: {},
    status: false
}
const ALLCITYLIST = {}
const ALLSTATELIST = []

for (const [key, values] of Object.entries(IndianStates)) {
    ALLSTATELIST.push({ value: key, label: values })
}

for (const [key, values] of Object.entries(IndianCities)) {
    const arr = []
    for (const name of values) {
        arr.push({ value: name, label: name })
    }
    ALLCITYLIST[key] = arr
}

const CustomForm = (props) => {
    const fileRef = useRef(null)
    const dispatch = useDispatch()
    const { userList, editIndex, isEditMode } = useSelector(state => state)
    const [cityList, setCityList] = useState([])
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const formDefaultValues = !!isEditMode ? userList?.length > 0 && userList[editIndex] : DEFAULT_VALUES
    useEffect(() => {
        formDefaultValues?.state?.value?.length > 0 && setCityList(ALLCITYLIST[formDefaultValues?.state?.value])
    }, [])

    console.log()
    return (
        <Wrapper>
            <div className='form-wrapper px-4 pt-4'>
                <Formik
                    initialValues={formDefaultValues}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .max(15, "Must be 15 characters or less")
                            .matches(latinCharsRegEx, 'Name can only contain alphabets.')
                            .required("Required"),
                        password: Yup.string()
                            .required('No password provided.')
                            .min(8, 'Password is too short - should be 8 chars minimum.')
                            .matches(passwordRegEx, 'Password contain at least one Uppercase, lowercase, special and number.'),
                        email: Yup.string()
                            .email("Invalid Email address").required("Required"),
                        address: Yup.string()
                            .max(500, "Must be 500 characters or less").required("Required"),
                        attachment: Yup.mixed().test("fileSize", "The file is too large",
                            (value) => {
                                const file = new File([value], "filename")
                                return file.size <= 2000000
                            })
                    })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            !!isEditMode
                                ? dispatch(updateUser(values))
                                : dispatch(addNewUser(values))
                            props.handleClose()
                            actions.setSubmitting(false);
                        }, 100);
                    }}
                >
                    {formik => {
                        // console.log(formik)
                        return (
                            <Form>
                                <div className='row'>
                                    <div className='col-6 pt-2'>
                                        <label htmlFor={"firstName"} className="label-class">{"Name"}</label>
                                        <CustomeInput
                                            name="firstName"
                                            type="text"
                                            // placeholder="Harsh"
                                            className="input-box"
                                        />
                                    </div>

                                    <div className='col-6 pt-2 position-relative'>
                                        <label htmlFor={"password"} className="label-class">{"Password"}</label>
                                        <CustomeInput
                                            name="password"
                                            type={isPasswordVisible ? "text" : "password"}
                                            placeholder=""
                                            className="input-box"
                                        />
                                        {isPasswordVisible ? (
                                            <img className='pass-icon' onClick={() => setPasswordVisible(!isPasswordVisible)} src={PASS_ON} alt="" />
                                        ) : (
                                            <img className='pass-icon' onClick={() => setPasswordVisible(!isPasswordVisible)} src={PASS_OFF} alt="" />
                                        )}
                                    </div>

                                    <div className='col-12 pt-2'>
                                        <label htmlFor={"email"} className="label-class">{"Email"}</label>
                                        <CustomeInput
                                            label={"Email"}
                                            name="email"
                                            type="text"
                                            placeholder="abc@gmail.com"
                                            className="input-box"
                                        />
                                    </div>

                                    <div className="col-6 pt-2">
                                        <label htmlFor={"state"} className="label-class">{"State"}</label>
                                        <ReactSelect
                                            name="state"
                                            options={ALLSTATELIST}
                                            value={formik.values.state}
                                            onChange={(name, value) => {
                                                setCityList(ALLCITYLIST[value.value])
                                                formik.setFieldValue(name, value)
                                                formik.setFieldValue("city", { value: '', label: '' })
                                            }}
                                            onBlur={formik.setFieldTouched}
                                            error={formik.errors.state}
                                            touched={formik.touched.state}
                                        />
                                    </div>

                                    <div className="col-6 pt-2">
                                        <label htmlFor={"city"} className="label-class">{"City"}</label>
                                        <ReactSelect
                                            name="city"
                                            options={cityList}
                                            value={formik.values.city}
                                            onChange={formik.setFieldValue}
                                            onBlur={formik.setFieldTouched}
                                            error={formik.errors.city}
                                            touched={formik.touched.city}
                                        />
                                    </div>

                                    <div className="col-6 pt-2 date-picker">
                                        <label htmlFor={"date"} className="label-class">{"Date"}</label>
                                        <br />
                                        <CustomeDatePicker
                                            name="date"
                                            onChange={formik.setFieldValue}
                                            defaultValue={formik.values.date}
                                        />
                                    </div>

                                    <div className="col-6 pt-2">
                                        <label htmlFor={"age"} className="label-class">{"Age"}</label>
                                        <br />
                                        <Slider
                                            defaultValue={formik.values.age || 0}
                                            aria-label="Default"
                                            valueLabelDisplay="auto"
                                            onChange={e => formik.setFieldValue("age", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12 pt-2">
                                        <label htmlFor={"address"} className="label-class">{"Address"}</label>
                                        <br />
                                        <textarea
                                            name="address"
                                            id="address"
                                            rows="10"
                                            className='address-input'
                                            maxLength={500}
                                            value={formik.values.address}
                                            onChange={e => formik.setFieldValue("address", e.target.value)}
                                        />
                                        {formik.touched.address && formik.errors.address ? (
                                            <div className='text-danger'>{formik.errors.address}</div>
                                        ) : null}
                                    </div>

                                    <div className="col-6 pt-2">
                                        <div className=''>
                                            <label htmlFor={"status"} className="label-class">{"Status"}</label>
                                            <Switch
                                                checked={formik.values.status}
                                                onChange={e => formik.setFieldValue("status", e.target.checked)}
                                            />
                                        </div>
                                        <label htmlFor={"attachment"} className="label-class mt-3">{"Profile Image"}</label>
                                        <div className='image-div'>

                                            {formik.values.attachment ? (
                                                // <img src={getImageURL(formik.values.attachment)} alt="" />
                                                <PreviewImage file={formik.values.attachment} />
                                            ) : (
                                                <img
                                                    className='upload-placeholder'
                                                    src={UPLOAD_IMG}
                                                    alt=""
                                                    onClick={() => fileRef.current.click()}
                                                />
                                            )}
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                name="attachment"
                                                accept="image/png, image/jpg, image/jpeg"
                                                onChange={event => {
                                                    const reader = new FileReader()
                                                    reader.readAsDataURL(event.target.files[0])
                                                    reader.onload = () => {
                                                        formik.setFieldValue("attachment", reader.result)
                                                    }
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.touched.attachment && formik.errors.attachment ? (
                                            <div className='text-danger'>{formik.errors.attachment}</div>
                                        ) : null}
                                    </div>

                                    <div className="col-6 pt-2">
                                        <label htmlFor={"color"} className="label-class">{"Select Favorite Color"}</label>
                                        <br />
                                        <SketchPicker
                                            color={formik.values.color}
                                            onChangeComplete={e => formik.setFieldValue("color", e)}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center py-3 sticky-bottom'>
                                    <button type="submit" className="btn btn-primary submit-button">Submit</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik >
            </div>
            <style jsx="true">{`
            .pass-icon {
                position: absolute;
                top: 45px;
                right: 25px;
            }
            .form-wrapper {
                background: white;
                width: 50%;
                height:85%;
                border-radius: 10px;
                overflow: auto;
            }
            .label-class {
                font-size: 16px;
                margin-bottom: 5px;
                color: black;
                font-weight: 500;
            }
            .input-box {
                width: 100%;
                border: 1px solid #d3d3d3;
                height: 40px;
                padding: 10px;
                border-radius: 6px;
            }
            .address-input {
                width: 100%;
                border: 1px solid #d3d3d3;
                height: 100px;
                padding: 10px;
                border-radius: 6px;
                resize: none;
            }
            .date-picker input {
                padding: 10px;
            }
            .date-picker .MuiTextField-root, .image-div input {
                width: 100%;
            }
            .image-div {
                cursor: pointer;
            }
            .upload-placeholder {
                width: 150px;
                height: 200px;
                object-fit: contain;
                margin: 10px;
            }
            .submit-button {
                width: 150px;
            }
            .sticky-bottom {
                position: sticky;
                bottom: 0;
            }
            `}</style>
        </Wrapper>
    )
}

export default CustomForm