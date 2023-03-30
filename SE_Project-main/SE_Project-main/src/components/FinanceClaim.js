import React,{ useEffect, useRef, useState }from 'react'
import { useParams } from 'react-router-dom';
import {db} from "../firebase"
import Image from "./default.png";
import firebase from 'firebase/compat/app';
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import { Container,Button } from 'react-bootstrap';
import SideBarManager from './sideBarManager';
import SideBarFinance from './sideBarFinance';
export default function FinanceClaim() {
    let params = useParams(); // Unpacking and retrieve id
    const db=firebase.firestore();
    const docRef=doc(db,'Claims',params.id)
    
    const[out,setOut]=useState("")
    const[user,setUser]=useState('')
    const[loading,setLoading]=useState(true)
    const[claimDate,setClaimDate]=useState("")
    const[submitDate,setSubmitDate]=useState("")
    async function getData(){
        if(out===""){
            await getDoc(docRef).then((e)=>{
                setOut(e.data())
                console.log(e.data())
                console.log(e.data().createdAt.toDate().toLocaleDateString("en-GB"))
                setClaimDate(e.data().date.toDate().toLocaleDateString("en-GB"))
                setSubmitDate(e.data().createdAt.toDate().toLocaleDateString("en-GB"))
                getUser(e.data().userid)
            })
            
              console.log(out)
        }
    }
    async function getUser(props){
        console.log(props)
        let userRef=await doc(db,'Employees',props)
            await getDoc(userRef).then((e)=>{
                setUser(e.data())
            })
    }
    useEffect(() => {
        getData()
      }, [])
    useEffect(() => {
      
        console.log(claimDate)
    }, [out])

    function HandleReimburse(id){
        var claimRef = db.collection("Claims").doc(id); // need to pass doc.id to do this
        return claimRef.update({
        reimbursementStatus: "reimbursed"
        })
        .then(() => {
        console.log("Document successfully updated!");
        alert("Reimbursed Successfully");
        })
    }
    function Display(){
        if(out===""){
            return <>Loading....</>
        }
        else{
            return(<>
                <div className='row'>
                    <div className='col-9'><h3>{out.title}</h3></div>
                    <div className='col text-right' style={{textAlign:"right"}}><p className='pull-right'> Expense Date:{claimDate} </p></div>
                    </div>
                    <div className='row'>
                        <div className='col border rounded'>{out.description}</div>
                        </div>
                        <br></br>
                        <div className='row align-items-center border rounded'><div className='col-6 mx-auto' style={{background:"grey",height:"300px",width:'300px' ,textAlign:"center"}}><div>No image Yet</div></div></div>
                        <br></br>
                <div className='row'>
                    <div className='col-10'></div>
                    <div className='col-3'>Submitted at:{submitDate}</div>
                    <div className='col-7'></div>
                <div className='col border rounded' >Total:{out.total}.00 {out.currency}</div>
                </div>
                <div className='row'>
                
                <div className='col'>Submitted By: <a className='link-primary' href={`http://localhost:3000/FinanceUserProfile/${out.userid}`}><img className='rounded-circle' src={Image} style={{height:'20px'}}></img> {user.forename} {user.surname}</a></div>
                <div className='col-9'></div>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col'><Button style={{color:"white"}} variant="success" onClick={()=>{HandleReimburse(params.id)}}>Finish Reimbursement</Button>
                </div>
                </div>
                
                
            </>)
        }
    }
    function ClaimData(){
    }
  return (
    <div>
        <div className='row'>
        <div className='col bg-dark border-right' style={{height:'1000px',paddingRight:'0'}} id="sticky-sidebar">
         <SideBarFinance/>   
        </div>
        <div className='col-10'>
        <div className='border-bottom'><h2>Employee Claim</h2></div>
        <Container className='border' style={{paddingLeft:'5%',paddingRight:'5%'}}>
        {Display()}
        </Container>
        </div>
        </div>
    </div>
  )
}
