import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/employeeList/EmployeeList';
import EditDetails from './components/employeeList/Editdetails';
import { Route, Routes } from "react-router";
import {Test} from './components/test';
import { useState } from 'react';
function App(props) {

  const[rend,setRend]=useState(false)
const testVariable="Testing"
  return (
    <div className="App">
      <EmployeeList/>
      {/* <Test
      testVariable={testVariable}
      /> */}
      {/* {rend ===false ?(
      <>
      <EmployeeList
      rend={rend}
      setRend={setRend}
      />
      </>
      ):(
      <>
      <EditDetails
       rend={rend}
       setRend={setRend}
      />
      </>)}
     */}
    </div>
  )
}

export default App;

{/* <Routes>
<Route path="/" element={<EmployeeList/>}></Route>
<Route path="/edit" element={<EditDetails />}></Route>
    {/* <Route path="/edit" component={EditDetails} /> */}
    {/* <Route path="*" render={() => <PageNotFound />} /> */}
  // </Routes> */}/
