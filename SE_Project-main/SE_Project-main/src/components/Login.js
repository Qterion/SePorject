import React, {useEffect, useRef, useState} from 'react'
import {Card,Form,Button, Alert} from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import {db} from "../firebase"
import { useAuth } from '../context/AuthContext'
export default function Login() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const navigate=useNavigate()
    const{login, currentUser}=useAuth()
    const{logout}=useAuth()
    const [error, setError]=useState()
    const [loading,setLoading]=useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        
        try{
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        HandleStatus()
    }
         catch{
            setError("Failed to log in")
        }
        setLoading(false)
    }
    async function HandleStatus(){
        const docRef= await doc(db,'Employees',currentUser.uid)
        console.log('gg')
        getDoc(docRef).then((e)=>{
            if(e.data().status==="active"){
                navigate("/PersonalProfile")
            }
            else{
                logout()  
                setError("Your Account have been suspended due to unusual activity")
            }
        })
    }
  return (
    <>
    <div className="row" style={{paddingTop:"40px"}}>
    <div className="col-4">

    </div>
    <div className="col">
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}></Form.Control>
                </Form.Group>
                
                <Button disabled={loading} className="w-100" type="submit">
                    Log In
                    </Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Need an Account? <Link to="/register">Register</Link>
    </div>
    </div>
    <div className="col-4">

    </div>
    </div>
    </>
  )
}

