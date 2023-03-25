import './App.css';
import ReactTable from './Components/ReactTable';
import { useState } from 'react';
import { Modal } from '@mui/material';
import CustomForm from './Components/CustomForm';
import { connect, useDispatch } from 'react-redux';
import { resetEditMode, setEditMode } from './actions/user';

function App(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch(resetEditMode())
    setOpen(true)
  };
  const handleClose = () => {
    dispatch(resetEditMode())
    setOpen(false)
  };
  const dispatch = useDispatch()

  const openEditModel = (index) => {
    handleOpen()
    dispatch(setEditMode(index))
  }

  return (
    <div className="App mt-5">
      <div className='d-flex justify-content-center'>
        <button onClick={handleOpen} className="btn btn-primary">Add User</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <CustomForm
            handleClose={handleClose}
          />
        </div>
      </Modal>
      <ReactTable openEditModel={openEditModel} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App);
