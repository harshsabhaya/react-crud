import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import Wrapper from '../Wrapper';
import PreviewImage from './PreviewImage';
import AlertDialog from './AlertDialog';
import { deleteUser } from '../actions/user';

const ReactTable = (props) => {
    const userList = useSelector(state => state.userList)
    const dispatch = useDispatch()
    const [isDeleteModel, setDeleteModel] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(false)
    const toggleDeleteModel = (index) => {
        setDeleteIndex(index)
        setDeleteModel(!isDeleteModel)
    }
    const handleDelete = () => {
        console.log("deleteIndex", deleteIndex)
        dispatch(deleteUser(deleteIndex))
        toggleDeleteModel()
    }
    console.log("userList", userList)
    return (
        <Wrapper>
            <div className='d-flex justify-content-center mt-3'>
                <TableContainer component={Paper} sx={{ minWidth: "75%", maxWidth: "95%" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Favorite color</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...userList].map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {row.attachment ? <PreviewImage file={row.attachment} /> : null}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell>
                                        <div className='text-truncate' style={{ width: "125px" }}>{row.email}</div>
                                    </TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.city?.label}</TableCell>
                                    <TableCell>{row.state?.label}</TableCell>
                                    <TableCell>{dayjs(row.date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>
                                        <div className='multiline-css'>{row.address}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{
                                            height: "40px",
                                            width: "40px",
                                            borderRadius: "50%",
                                            background: row.color.hex
                                        }}></div>
                                    </TableCell>
                                    <TableCell align="center">{row.status}
                                        <Switch
                                            checked={row.status}
                                        />
                                    </TableCell>
                                    <TableCell align="center"><button onClick={() => props.openEditModel(index)}>Edit</button></TableCell>
                                    <TableCell align="center"><button onClick={() => toggleDeleteModel(index)}>Delete</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <AlertDialog
                open={isDeleteModel}
                handleClose={toggleDeleteModel}
                handleDisagree={toggleDeleteModel}
                handleAgree={handleDelete}
                agreeLabel={"Delete"}
                disagreeLabel={"Cancel"}
                headingTitle={"Do you want to delete?"}
                subText={"After deleting this user you cannot recover that user data"}
            />
            <style>{`
            .multiline-css {
                display: -webkit-box;
                max-width: 135px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .delete-model {
                background: white;
                background: white;
                width: 370px;
                height: 200px;
                border-radius: 10px;
            }
            `}</style>
        </Wrapper>
    );
}

export default ReactTable