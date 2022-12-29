import React from 'react'
import ReactDOM from "react-dom";
import classes from'./Modal.module.css'
import './Modal.css'
import Card from './card/Card';
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
            <h3>Update Employee Details</h3>
        </div>
        <div className='addnew'>
        <form method="post" name="form" className={classes.form}>
          <label htmlFor="styleName">Enter EmployeeId</label>
          <input
            type="text"
            id="employeeID"
            name="employeeID"
            disabled
            value={props.newData.employeeID}
            onChange={props.handleChange}
          />
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
          <button
             onClick={props.onClose}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type='button' onClick={()=>{
            props.updateEmployee(props.newData)
            console.log("buttonclick");
            }}>Submit</button>
          </form>
          </div>
        </Card>
      
    );
  };

const EditEmployee = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
        onClose={props.closeModal}
        updateEmployee={props.updateEmployee}
        newData={props.newdata}
        handleChange={props.handleChange}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default EditEmployee;



