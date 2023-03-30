import React,{ useEffect, useRef, useState }from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import Image from "./default.png";
import { Link,useNavigate} from 'react-router-dom'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import { Container,Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import CreateClaim from './createClaim';
import SideBarFinance from './sideBarFinance';
export default function Claim() {
    const{currentUser}=useAuth()
    const navigate=useNavigate()
    const[popup,setPopup]=useState(false)
    let params = useParams(); // Unpacking and retrieve id
    const db=firebase.firestore();
    const userRef=doc(db,'Employees',currentUser.uid)
    const[user,setUser]=useState('')
    const[claimDate,setClaimDate]=useState("")
    const [allDocs, setAllDocs]=useState([]);
    
    const[totClaims,setTotClaims]=useState(0)
    const[totApproved,setTotApproved]=useState(0)
    const[totVerified,setTotVerified]=useState(0)
    const[totCLaimA,setTotClaimA]=useState(0)
    const[totAPPA,setTotAppA]=useState(0)
    const[totVA,setTotVA]=useState(0)
    const[submitDate,setSubmitDate]=useState("")
    
    async function getUser(){
        if(user===""){
            await getDoc(userRef).then((e)=>{
                setUser(e.data())
                //setClaimDate(e.data().date.toDate().toLocaleDateString("en-GB"))
                console.log(e.data().createdAt.toDate().toLocaleDateString("en-GB"))
                setSubmitDate(e.data().createdAt.toDate().toLocaleDateString("en-GB"))
                fetchClaims()
            })
        }
    }
    useEffect(() => {
        getUser()
      }, [])
    useEffect(() => {
      
        console.log(claimDate)

    }, [user])
    useEffect(() => {
      
    }, [allDocs])

    function HandleReimburse(id){
        var claimRef = db.collection("Claims").doc(id); // need to pass doc.id to do this
        return claimRef.update({
        approvalStatus: "approved"
        })
        .then(() => {
        console.log("Document successfully updated!");
        })
        .catch((error) => {
        console.error("Error updating document: ", error);
        });
    }
    function fetchClaims(){ // to fetch pending claims
        var totCl=0
        var totCLA=0
        var apprCl=0
        var apprCLA=0
        var verCl=0
        var verCLA=0
        db.collection("Claims").where("approvalStatus", "==", "approved").orderBy("createdAt","desc")
        .onSnapshot((querySnapshot) => { // listens for changes in real time
            querySnapshot.forEach((doc) => {
                var data = doc;
                setAllDocs(arr => [...arr, data]);
                totCl=totCl+1
                totCLA=totCLA+parseInt(doc.data().total)
                setTotClaimA(totCLA)
                setTotClaims(totCl)
                if(doc.data().approvalStatus==="approved"){
                    apprCl=apprCl+1
                    apprCLA=apprCLA+parseInt(doc.data().total)
                    setTotAppA(apprCLA)
                    setTotApproved(apprCl)
                }
                if(doc.data().reimbursementStatus==="reimbursed"){
                    verCl=verCl+1
                    verCLA=verCLA+parseInt(doc.data().total)
                    setTotVA(verCLA)
                    setTotVerified(verCl)
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
        
    }
    function Claims(){
        return(
        allDocs.map((data) => {
            console.log(`Index: {i}`);
            
            return(
                <>
                <div className='row'>
                <div className='col-2 border ' style={{borderLeftRadius:'5%'}}>{data.data().title}</div>
                <div className='col-2 border' >£{data.data().total}.00</div>
                <div className='col-2 border'>{data.data().approvalStatus}</div>
                <div className='col-2 border ' style={{borderRightRadius:'5%'}}>{data.data().reimbursementStatus}</div>
                <div className='col-2 border'>{data.data().createdAt.toDate().toLocaleDateString("en-GB")}</div>
                <div className='col'><Link className="btn-light border rounded" to={`/FinanceClaim/${data.id}`}>View Claim</Link> </div>
                </div>
                
                <div className='row'><br></br></div>
                </>
    )   
        }))
    }
    function Display(){
        if(user===""){
            return <>Loading....</>
        }
        else{
            return(<>
            <br></br>
                <div className='row border-bottom'>
                    
                    <div className='col text-right ' style={{textAlign:"left",}}>
                        <div className='row'>
                            </div>
                            <br></br>
                            <div className='row'>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Approved Claims</p>
                                <h5>{totApproved}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Reimbursed Claims</p>
                                <h5> {totVerified}</h5>
                            </div>
                            </div>
                            </div>
                            <br></br>
                            <div className='row'>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Approved Total</p>
                                <h5>£{totAPPA}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Reimbursed Total</p>
                                <h5> £{totVA}</h5>
                            </div>
                            </div>
                            </div>

                            <br></br>
                        <div className='row'>
                            <div className='col-9'></div>
                            <div className='col' style={{textAlign:"right", paddingRight:'0'}}></div>
                        
                        </div>
                    </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <h3>Employee's Claims</h3>
                    </div>
                    <div className='row'>
                    <div className='row'>
                <div className='col-2 border rounded'>Title</div>
                <div className='col-2 border rounded'>Total</div>
                <div className='col-2 border rounded'>Approval Status</div>
                <div className='col-2 border rounded'>Reimbursement Status</div>
                <div className='col-2 border rounded'>Submission Date</div>
                <div className='col '></div>
                        </div>
                        
                        <div className='row'><br></br></div>
                        {Claims()}
                        <br></br>
                        </div>
                <div className='row'>
                    <div className='col-10'></div>
                    <div className='col-3'></div>
                    <div className='col-7'></div>
                <div className='col' ></div>
                </div>
                
                <br></br>
                
                
                
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
        <div className='border-bottom'><h2>Finance Dashboard</h2></div>
        <Container className='border rounded' style={{paddingLeft:'5%',paddingRight:'5%'}}>
        {Display()}
        </Container>
        </div>
        </div>
    </div>
  )
}