import React from 'react'
// import { useState } from 'react'
import Wrapper from '../Wrapper'

const PreviewImage = ({ file }) => {
    // const [preview, setPreview] = useState(null)

    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = () => {
    //     setPreview(reader.result)
    // }
    return (
        <Wrapper>
            {true ? <img className='img-class' src={file} alt="" /> : "loading..."}
            <style>{`
            .img-class{
                width: 75px;
                height: 120px;
                object-fit: contain;
                margin: 10px;
            }
            `}</style>
        </Wrapper>
    )
}

export default PreviewImage