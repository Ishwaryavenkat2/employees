import React, { useEffect, useState,useRef } from 'react'
import axios from "axios";
import AddNewEmployee from '../Modal/AddNewEmployee';
import EditEmployee from '../Modal/EditEmployee';
import EditDetails from './Editdetails';

import { useDownloadExcel } from 'react-export-table-to-excel';
const EmployeeList =(props)=>{
const[user,setUser]=useState([])
const[newModal,setNewModal]=useState(false)
const[editModal,setEditModal]=useState(false)
const[editDetails,setEditDetails]=useState(false)
const[ret,setret]=useState(false)
const [newData, setNewData] = useState({
    employeeID:"",
    employeeName: "",
    employeeSalary: "",
    city: "",
  })
  
  const[order,setOrder]=useState("ASC")

  const sorting=(col)=>{
    if(order=="ASC"){
      const sorted=[...user].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted)
      setOrder("DSC")
    }
    if(order=="DSC"){
      const sorted=[...user].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted)
      setOrder("ASC")
    }

  }
const headers={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Orgin':'*'
}
const fetchData = () => {
    return axios.get("https://localhost:7194/api/Employee/getEmployee", { headers })
          .then((response) => {setUser(response.data)})
          
  }

  const handleChange = (event) => {
    event.persist();
    setNewData(newData => ({ ...newData, [event.target.name]: event.target.value }));
  }

  function refreshPage() {
    window.location.reload(false);
  }

  async function addNewEmployee(newData){
    return await axios.post("https://localhost:7194/api/Employee/addEmployee", 
    {employeeName: `${newData.employeeName}`,employeeSalary: `${newData.employeeSalary}`,city: `${newData.city}`},{ headers })
          .then((response) => {setUser(response.data);console.log("---",response);
          setNewModal(false)
          setNewData({
            employeeName: "",
            employeeSalary: "",
            city: "",
          });
          refreshPage();
        }); 
        
  }
  
    const updateEmployee = (updateData) => {
console.log("updateData",updateData);
    return axios.put("https://localhost:7194/api/Employee/updateEmployee",
    {employeeID: `${updateData.employeeID}`,employeeName: `${updateData.employeeName}`,employeeSalary: `${updateData.employeeSalary}`,city: `${updateData.city}`}, { headers })
          .then((response) => {setUser(response.data);console.log("---",response)
          setEditModal(false)
          setNewData({
            employeeID:"",
            employeeName: "",
            employeeSalary: "",
            city: "",
          });
          refreshPage();
        })       
  }

//   const deleteEmployee = () => {
//     return axios.put("https://localhost:7194/api/Employee/deleteEmployee", { headers })
//           .then((response) => {setUser(response.data);console.log("---",response)})       
//   }

  useEffect(() => {
    fetchData();
  },[])

  const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

return(
    <div>
      {ret == false?(
      <>
<h1>Employee List</h1>
        <button onClick={()=>setNewModal(true)}><i class="fa fa-user-plus" aria-hidden="true"></i></button>
        <button onClick={onDownload}> Export excel </button>

            <table className='table .table-bordered container' ref={tableRef}>  
                <thead className='table-dark'>
                    <tr>
                        <th scope="col" onClick={()=>sorting("employeeID")}>Id</th>
                        <th scope="col" onClick={()=>sorting("employeeName")}>Name</th>
                        <th scope="col" onClick={()=>sorting("employeeSalary")}>Salary</th>
                        <th scope="col" onClick={()=>sorting("city")}>City</th>
                        <th scope="col">Edit</th>
                        {/* <th scope="col">Delete</th> */}
                    </tr>
                </thead>
                {user && user.length > 0 && user.map((userObj) => (
                <tbody>
                    <tr key={userObj.employeeID}>
                        <th>{userObj.employeeID}</th>
                        <td>{userObj.employeeName}</td>
                        <td>{userObj.employeeSalary}</td>
                        <td>{userObj.city}</td>
                        <td 
                        onClick={()=>{
                          setret(true)
                        setNewData({
                            employeeID:userObj.employeeID,
                            employeeName: userObj.employeeName,
                            employeeSalary: userObj.employeeSalary,
                            city: userObj.city,
                        })
                        }}
                        >
                          <i class="fas fa-edit"></i>  
                        </td>
                        {/* <td onClick={()=>deleteEmployee()}><i class="fa fa-trash"></i></td> */}
                    </tr>
                </tbody>
                 ))}
            </table>
           
           {newModal && <AddNewEmployee
           setNewModal={setNewModal}
           addNewEmployee={addNewEmployee}
           handleChange={handleChange}
           newData={newData}
            closeModal={() => {
                setNewModal(false);
              }}
             
           />}
           {editModal&& <EditEmployee
          
           setEditModal={setEditModal}
           handleChange={handleChange}
       
           newdata={newData}
            closeModal={() => {
                setEditModal(false);
              }}
              updateEmployee={updateEmployee}
           />}
      </>
      ):(
      <>
      <EditDetails
      newData={newData}
      updateEmployee={updateEmployee}
      setret={setret}
      handleChange={handleChange}
      />
       
      </>
      )}
        
          
        </div>  
        
        
)
}

export default EmployeeList

{/* <form method="post" name="form">
                <label htmlFor="styleName">Enter EmployeeId</label>
                <input
                type="text"
                id="employeeID"
                name="employeeID"
                disabled
                value={newData.employeeID}
                onChange={handleChange}
                />
                <label htmlFor="styleName">Enter Employee Name</label>
<input
  type="text"
  id="employeeName"
  name="employeeName"
  value={newData.employeeName}
  onChange={handleChange}
/>
 
<label htmlFor="styleName">Enter Employee Salary</label>
<input
  type="text"
  id="employeeSalary"
  name="employeeSalary"
  value={newData.employeeSalary}
  onChange={handleChange}
/>
<label htmlFor="styleName">Enter Employee City</label>
<input
  type="text"
  id="city"
  name="city"
  value={newData.city}
  onChange={handleChange}
/> 
<button
type='button'
   onClick={()=>setret(false)}
  id="cancelBtn"
>
  Cancel
</button>
<button type='button' onClick={()=>{
  updateEmployee(newData)
  setret(false)
  console.log("buttonclick");
  }}>Submit</button>
</form> */}