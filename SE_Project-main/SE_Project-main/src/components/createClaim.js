import React, { useEffect, useRef, useState } from 'react'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import {createUserClaim, db} from "../firebase"
import { Card,Form, Button,Alert } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './claim.css';
import './popup.css'
import Datepicker from 'react-datepicker'
import { useAuth } from '../context/AuthContext'
require('react-datepicker/dist/react-datepicker.css')
export default function CreateClaim(props) {

  const[error,setError]=useState("")
  const titleRef=useRef()
  const descriptionRef=useRef()
  const currencyRef=useRef()
  const totalRef=useRef()
  const[out,setOut]=useState("")
  const[selectedDate,setSelectedDate]=useState(null)
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
  function handleLogout(){
   
  }
  async function submit(e) {
    e.preventDefault()
    console.log(currencyRef.current.value)
    console.log(selectedDate)
    setError("")
    if(titleRef.current.value===""){
      return setError("Please enter the Title")
    }
    if(totalRef.current.value==""){
      return setError("Please enter total value")
    }
    try{
    setError('')
    setLoading(true)
    await createUserClaim(currentUser,titleRef.current.value,descriptionRef.current.value,totalRef.current.value,currencyRef.current.value,selectedDate)
    window.location.reload(true);
  }
     catch{
        setError("Failed to create Claim")
    }
    setLoading(false)
}


  return (props.trigger)? (
    <div className='popup'>
    <Card onSubmit={submit} className="card bg-white">
    <div className='row justify-content-between'>
      <div className='col-11'>
      <h4 className='text-secondary'>New Expense</h4>
      </div>
      <div className='col'>
      <button type="button" className="btn-close" onClick={()=>props.setTrigger(false)} aria-label="Close"></button>
      </div>
    </div>
    <Form className="d-flex justify-content-start border-top">
    <div>
    {error && <Alert variant="danger">{error}</Alert>}
    <Card.Body>
    <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" ref={titleRef} required></Form.Control>
                </Form.Group>
    <label htmlFor="Textarea">Description</label>
    <textarea className="form-control" id="Textarea" ref={descriptionRef} placeholder="Comments on claim" required></textarea>
    <div className="invalid-feedback"></div>
    <Form.Label>Total</Form.Label>
        <div className='item'>
        <Form.Group id="name"> 
        <Form.Control name="name" placeholder='*Total' ref={totalRef} />
         </Form.Group>
         <div className='break'></div>
         <Form.Group id="price">
         <select className="form-select form-select-md" ref={currencyRef} aria-label=".form-select-lg example">
        <option selected>GPB £</option>
        <option value="USD $">USD $</option>
        <option value="KZT ₸">KZT ₸</option>
        <option value="UAH ₴">UAH ₴</option>
        </select>
         </Form.Group>
        </div>
        <Form.Group id="attendees"> 
        <Form.Label>Attendees</Form.Label>
        <div className='border'>
        <div className='bg-light border col-2 rounded'><img className='Att-image rounded-circle' src='./default.png'></img>You</div>
        </div>
         </Form.Group>
        <Form.Group id="date">
        <Form.Label>Date</Form.Label>
        <div className='col-4'>
        <Datepicker  selected={selectedDate} onChange={date=>setSelectedDate(date)} 
          className='border form-control'/>
         </div>
        </Form.Group>
        
        </Card.Body>
      
      
      <Button disabled={loading} onClick={submit}>Submit</Button>
      </div>
      <div className='addImageBorder border rounded'>
        <img  className="addImage" src="addImage1.png"/>
      </div>
      </Form>
    </Card>
    </div>
  ):''
}