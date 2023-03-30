import React, {useEffect, useRef, useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import { useAuth } from '../context/AuthContext'
export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const inviteRef=useRef()
    const nameRef=useRef()
    const surnameRef=useRef()
    const{signup, currentUser}=useAuth()
    const [error, setError]=useState()
    const [Out, setOut]=useState()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const db=firebase.firestore();
    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        const docRef= await doc(db,'Invite',inviteRef.current.value)
        if(passwordRef.current.value!== passwordConfirmRef.current.value){
            
            return setError("Password do not match")
        }
        if(passwordRef.current.value.length<8){
            return setError("Minimum password length is 8 characters")
        }
        if(inviteRef.current.value===""){
            
            return setError("Please enter invite key")
        }
        getDoc(docRef).then((e)=>{
            if(!e.data()){
                return setError("Invite key not valid")
            }
            else if(e.data().status!=="Available"){
                return setError("Invite key already in use")
            }
                handleSignup()
            })
        
        
    }
    async function HandleInvite(id,email){
        var claimRef = db.collection("Invite").doc(id); // need to pass doc.id to do this
        return claimRef.update({
        status: "claimed",
        email:email
        })
        .then(() => {
        console.log("Document successfully updated!");
        })
    }
    async function handleSignup(){
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value,nameRef.current.value,surnameRef.current.value)
            await HandleInvite(inviteRef.current.value,emailRef.current.value)
            navigate("/PersonalProfile")        
        }
             catch{
                setError("Failed to create an account")
            }
            
            setLoading(false)
    }
  return (
    <>
    <div className='row' style={{paddingTop:'40px'}}>
    <div className='col-4'>

    </div>
    <div className='col'>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="key">
                    <Form.Label>Invite Key</Form.Label>
                    <Form.Control type="text" ref={inviteRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" ref={surnameRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                </Form.Group>
                
                <Button disabled={loading} className="w-100" type="submit">
                    Sign Up
                    </Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Have an account? <Link to="/login">Log In</Link>
    </div>
    </div>
    <div className='col-4'>

    </div>
    </div>
    </>
  )
}