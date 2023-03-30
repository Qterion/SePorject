import React,{ useEffect, useRef, useState }from 'react'
import { useParams } from 'react-router-dom';
import {db} from "../firebase"
import Image from "./default.png";
import Logo from './Logo.png';
import Logout from './logout';
import { Link,useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import { Container,Button } from 'react-bootstrap';
export default function SideBarManager() {
    const{currentUser}=useAuth()
    const userRef=doc(db,'Employees',currentUser.uid)
    const[user,setUser]=useState('')
    const navigate=useNavigate()
    useEffect(() => {
        getUser()
    }, [])
    async function getUser(){
        if(user===""){
            await getDoc(userRef).then((e)=>{
                setUser(e.data())
            })
        }
    }
    function Redirect(link){
        navigate(link)
    }
    
    
  return (
    <>
    <br></br>
            <div className='row position-fixed' style={{width:"265px"}}>
            
            <div className='row' style={{paddingRight:'0'}}>
                <div className='col' style={{textAlign:'center',paddingRight:'0'}}><img className='rounded-circle' src={Image} style={{height:'50px', width:'60px'}}></img></div>
            </div>
            <div className='row'  style={{width:'100%',paddingRight:'0'}}>
                <div className='col' style={{width:'100%',textAlign:'center',paddingTop:"5px",paddingRight:'0'}}>
                <div style={{width:'100%',fontSize:'14px',color:"white"}}>{user.forename} {user.surname}</div>
                </div>
            </div>
            <div className='row'>
                <br></br>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0' ,textAlign:'right'}}>
            <Button style={{width:'100%',paddingTop:'20px',paddingBottom:'20px'}} variant="dark shadow-none" onClick={()=>Redirect("/ManagerDashboard")}>Dashboard</Button>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0'}}>
                   <Button style={{width:'100%',paddingTop:'20px',paddingBottom:'20px'}} variant="dark shadow-none"  onClick={()=>Redirect("/Invite")}>Invite</Button>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0' ,textAlign:'right'}}>
                   <Button style={{width:'100%',paddingTop:'20px',paddingBottom:'20px'}} variant="dark shadow-none">Mail</Button>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0'}}>
                   <Button style={{width:'100%',paddingTop:'20px',paddingBottom:'20px'}} variant="dark shadow-none">Settings</Button>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0'}}>
                   <Logout/>
            </div>
            <div className='row' style={{width:'100%',paddingRight:'0',paddingTop:"240px"}}>
            <div className='col' style={{textAlign:'center',paddingRight:'0'}}><img src={Logo} style={{height:'35px', width:'200px'}}></img></div>
            </div>
        </div>
    </>
  )
}
