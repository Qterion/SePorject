import React, {useEffect, useRef, useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import {db} from "../firebase"
import { useAuth } from '../context/AuthContext'
export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const inviteRef=useRef()
    const{signupv2, currentUser}=useAuth()
    const [error, setError]=useState()
    const [Out, setOut]=useState()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
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
    async function handleSignup(){
        try{
            setError('')
            setLoading(true)
            await signupv2(emailRef.current.value, passwordRef.current.value,inviteRef.current.value)
            navigate("/")
        }
             catch{
                setError("Failed to create an account")
            }
            setLoading(false)
    }
  return (
    <>
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
    </>
  )
}