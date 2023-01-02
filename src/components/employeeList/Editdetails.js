import React from 'react'
  import '../Modal/Modal.css'
  import '../Modal/Modal.module.css'
const EditDetails=(props)=>{


    return(
        <div>
             <form method="post" name="form">
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
type='button'
   onClick={()=>props.setret(false)}
  id="cancelBtn"
>
  Cancel
</button>
<button type='button' onClick={()=>{
  props.updateEmployee(props.newData)
  props.setret(false)
  console.log("buttonclick");
  }}>Submit</button>
</form>
 
  {/* <Link to="/">Submit</Link>
  <Link to="/">Cancel</Link>  */}
        </div>
    )
}
export default EditDetails

{/* <form method="post" name="form">
<label htmlFor="styleName">Enter EmployeeId</label>
<input
  type="text"
  id="employeeID"
  name="employeeID"
  disabled
  // value={props.newData.employeeID}
  // onChange={props.handleChange}
/>
 <label htmlFor="styleName">Enter Employee Name</label>
<input
  type="text"
  id="employeeName"
  name="employeeName"
  // value={props.newData.employeeName}
  // onChange={props.handleChange}
/>
<label htmlFor="styleName">Enter Employee Salary</label>
<input
  type="text"
  id="employeeSalary"
  name="employeeSalary"
  // value={props.newData.employeeSalary}
  // onChange={props.handleChange}
/>
<label htmlFor="styleName">Enter Employee City</label>
<input
  type="text"
  id="city"
  name="city"
  // value={props.newData.city}
  // onChange={props.handleChange}
/> 
<button
type='button'
   onClick={()=>props.abcd}
  id="cancelBtn"
>
  Cancel
</button>
<button type='button' onClick={()=>{
  props.updateEmployee(props.newData)
  console.log("buttonclick");
  }}>Submit</button>
</form>
 
  <Link to="/">Submit</Link>
  <Link to="/">Cancel</Link> */}