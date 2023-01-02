import React from 'react'
import ReactDOM from "react-dom";
import classes from'./Modal.module.css'
import './Modal.css'
import Card from './card/Card';
import FileUploadMultiple from '../fileupload/FileUploadMultiple';
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
  };

  const ModalOverlay = (props) => {

    return (
        <Card className={classes.modal}>
             <div className="titleCloseBtn">
          <button
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className='title'>
            <h3>Add New Employee</h3>
        </div>
        <div className='addnew'>
        <form method="post" name="form" className={classes.form}>
         
          <label htmlFor="styleName">Enter Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={props.newData.employeeName}
            onChange={props.handleChange}
          />
          <label htmlFor="styleName">Enter Employee Salary</label>
          <input
            type="text"
            id="employeeSalary"
            name="employeeSalary"
            value={props.newData.employeeSalary}
            onChange={props.handleChange}
          />
          <label htmlFor="styleName">Enter Employee City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={props.newData.city}
            onChange={props.handleChange}
          />

          <FileUploadMultiple/>

          <button
             onClick={props.onClose}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button 
          type='button'
          onClick={() => props.addNewEmployee(props.newData)}>Add</button>
          </form>
          </div>
        </Card>
      
    );
  };
 
const AddNewEmployee = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
        onClose={props.closeModal}
        addNewEmployee={props.addNewEmployee}
        handleChange={props.handleChange}
        newData={props.newData}
       
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddNewEmployee;



{/* <div className='modalBackground'>
        <div className='modalContainer'>
            <button  onClick={()=>props.closeModal()}>X</button>
        <div className='title'>
            <h3>Add New Employee</h3>
        </div>
        <div className='body'>
            <input type='text'/>
            <input type='text'/>
            <input type='text'/>
            <input type='text'/>
        </div>
        <div className='footer'>
            <button>Add</button>
            <button onClick={()=>props.closeModal()}>Cancel</button>
        </div>
        </div>
    </div> */}