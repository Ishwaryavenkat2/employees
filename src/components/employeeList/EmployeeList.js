import React, { useEffect, useState } from 'react'
import axios from "axios";
import AddNewEmployee from '../Modal/AddNewEmployee';
import EditEmployee from '../Modal/EditEmployee';

const EmployeeList =()=>{
const[user,setUser]=useState([])
const[newModal,setNewModal]=useState(false)
const[editModal,setEditModal]=useState(false)
const [newData, setNewData] = useState({
    employeeID:"",
    employeeName: "",
    employeeSalary: "",
    city: "",
  })
  const [data, setData] = useState({
    employeeID:"",
    employeeName: "",
    employeeSalary: "",
    city: "",
  })
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
    console.log("meww",newData);
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
console.log("func",updateData)
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


return(
    <div>
        <h1>Employee List</h1>
        <button onClick={()=>setNewModal(true)}>Add New Employee</button>
            <table className='table .table-bordered container'>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">City</th>
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
                        <td onClick={()=>{
                        setEditModal(true);
                        setNewData({
                            employeeID:userObj.employeeID,
                            employeeName: userObj.employeeName,
                            employeeSalary: userObj.employeeSalary,
                            city: userObj.city,
                        })
                        }}><i class="fas fa-edit"></i></td>
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
           {editModal && <EditEmployee
           setEditModal={setEditModal}
           handleChange={handleChange}
       
           newdata={newData}
            closeModal={() => {
                setEditModal(false);
              }}
              updateEmployee={updateEmployee}
           />}
        </div>   
)
}

export default EmployeeList