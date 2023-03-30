import React, { useEffect, useRef, useState } from 'react'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import {createUserClaim, db} from "../firebase"
import { Card,Form, Button,Alert } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './claim.css';
import { useAuth } from '../context/AuthContext'
export default function CreateClaim() {
  const[error,setError]=useState("")
  const titleRef=useRef()
  const[out,setOut]=useState("")
  const[total,setTotal]=useState('')
  const [loading,setLoading]=useState(false)
  const [inputFields,setInputFields]=useState([
    {name:'',price:''}
  ])
  const{currentUser, logout}=useAuth()
  const USERRef = collection(db,'Employees')
  const docRef=doc(db,'Employees',currentUser.uid)
    getDoc(docRef).then((e)=>{
      setOut(e.data())
  })
  useEffect(()=>{
    console.log(total)
  },[total]);
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
  const handleFormChange=(index, event)=>{
    let data=[...inputFields]
    data[index][event.target.name]=event.target.value
    setInputFields(data)
  }
  const addFields=()=>{
    let newfield={name:'',price:''}
    setInputFields([...inputFields,newfield])
  }
  async function submit(e) {
    e.preventDefault()
    setError("")
    var count=0.0
    for(var i=0;i<inputFields.length;i++){
      count=count+parseFloat(inputFields[i].price)
      
    }
    count=count.toString()
    console.log(count)
    if(Number.isNaN(count) || count<=0.0){
      return setError("Please enter only values in GBP in price field")
    } 
    if(titleRef.current.value===""){
      return setError("Please enter the Title")
    } 
    if(count!=NaN && count>0.0){
    try{
    setError('')
    setLoading(true)
    await createUserClaim(currentUser,titleRef.current.value,inputFields,count)
    }
     catch{
        setError("Failed to log in")
    }}
    setLoading(false)
}

const removeFields=(index)=>{
  let data=[...inputFields]
  data.splice(index,1)
  setInputFields(data)
}
  return (
    <>
    <Card onSubmit={submit}>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form>
    <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" ref={titleRef} required></Form.Control>
                </Form.Group>
    <label htmlFor="Textarea">Comments</label>
    <textarea className="form-control" id="Textarea" placeholder="Comments on claim" required></textarea>
    <div className="invalid-feedback"></div>
      {inputFields.map((input,index)=>{
        return(
          <>
          <Card.Body>
        <div className='item' key={index}>
        <Form.Group id="name"> 
        <Form.Control name="name" placeholder='Name' value={input.name}
         onChange={event=>handleFormChange(index,event)}/>
         </Form.Group>
         <Form.Group id="price">

         <Form.Control name="price" placeholder='Price £' value={input.price}
         onChange={event=>handleFormChange(index,event)}/>
         </Form.Group>
         <button onClick={()=>removeFields(index)}>-</button>
        </div>
        
        </Card.Body>
        </>
        )
      })}
      </Form>
      <Button onClick={addFields}>Add More</Button>
      <Button disabled={loading} onClick={submit}>Submit</Button>
    </Card>
    </>
  )
}