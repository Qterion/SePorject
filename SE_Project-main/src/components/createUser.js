import React, { Children, useEffect, useRef, useState } from 'react'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import {createUser, db} from "../firebase"
import { Card,Form, Button,Alert } from 'react-bootstrap'
import { Link} from 'react-router-dom'

import './claim.css';
import './popup.css'
import { useAuth } from '../context/AuthContext'
export default function CreateUser(props) {

  const[error,setError]=useState("")
  const nameRef=useRef()
  const surnameRef=useRef()
  const roleRef=useRef()
  const[out,setOut]=useState("")
  const [loading,setLoading]=useState(false)
  const{currentUser, logout}=useAuth()
  const USERRef = collection(db,'Employees')
  const docRef=doc(db,'Employees',currentUser.uid)
    getDoc(docRef).then((e)=>{
      setOut(e.data())
  })
  getDocs(USERRef).then((snapshot)=>{
    const ageg=[]
    snapshot.docs.forEach((doc)=>{
      ageg.push({...doc.data(),id:doc.id})
    })
    
  })
  .catch(err=>{
    console.log(err.message)
  })
  async function submit(e) {
    e.preventDefault()
    setError("")
    try{
    setError('')
    setLoading(true)
    await createUser(currentUser,"","",roleRef.current.value)
    window.location.reload(true);
    }
     catch{
        setError("Failed to create Key")
    }
    setLoading(false)
}


  return (
    <div>
    <div>
      Create New Key
    </div>
    <div onSubmit={submit} className=" bg-white" style={{width:'250px'}}>
    <Form className="">
    <div>
    {error && <Alert variant="danger">{error}</Alert>}
    <div className='row'>
    <div className='col-7' style={{paddingLeft:'0'}}>
    <div id="role">
                <select className="form-select form-select-md" ref={roleRef} aria-label=".form-select-lg example">
        <option selected>Claimnant</option>
        <option value="Manager">Manager</option>
        <option value="Finance">Finance</option>
        </select>
      </div>
    </div>
    <div className='col' style={{paddingRight:'0'}}>
    <Button disabled={loading} onClick={submit}>Submit</Button>
    </div>
    </div>
      </div>
      </Form>
    </div>
    </div>
  )
}