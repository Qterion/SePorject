import { doc,collection,getDoc} from "firebase/firestore";
import {db} from "../firebase"
import React, { useState } from 'react'
import { Card, Button,Alert } from 'react-bootstrap'
import { Link,useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Dashboard() {
  const[error,setError]=useState("")
  const{currentUser}=useAuth()
  const navigate=useNavigate()
  const [users,SetUsers]=useState([])
  const{logout}=useAuth()
  const USERRef = doc(db, 'Employees',`${currentUser.uid}`);
  const data= getDoc(USERRef)
  console.log(data)
  const [loading,setLoading]=useState(false)
  async function handleLogout(){
    try{
      setError('')
      setLoading(true)
      await logout()  
      navigate("/login")
  }
       catch{
          setError("Failed to log in")
      }
      setLoading(false)
  }
  return (
    <>
    <Card>
      <Card.Body>
      <h2 className="text-center mb-4">Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <strong>Email:</strong>{currentUser.email}
      <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
      </Card.Body>
    <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
    </div>
    </Card>
    </>
  )
}
