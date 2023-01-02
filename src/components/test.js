import React, { useState } from "react";

export const Test=(props)=>{
    const[data,setData]=useState("Test");
    return(
        <>
        <h1>Welcome{props.testVariable}</h1>
        <h2>{data}</h2>
        <button onClick={()=>setData("Ishwarya")}>click</button>
        </>
    )
}
