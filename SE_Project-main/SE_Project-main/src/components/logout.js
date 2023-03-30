import { useAuth } from '../context/AuthContext'
import { Link,useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import {Button} from 'react-bootstrap'

  export default function Logout(){
    const [loading,setLoading]=useState(false)
    const{logout}=useAuth()
    const[error,setError]=useState("")
    const navigate=useNavigate()
    async function handleLogout(){
        try{
          setError('')
          setLoading(true)
          await logout()  
          navigate("/login")
      }
           catch{
              setError("Failed log out")
          }
          setLoading(false)
      }
      return(
        <Button style={{width:'100%',paddingTop:'20px',paddingBottom:'20px'}} variant="dark shadow-none" onClick={handleLogout}>Logout</Button>
      );
  }
  