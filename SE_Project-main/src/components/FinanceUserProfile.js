import React,{ useEffect, useRef, useState }from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import Image from "./default.png";
import { Link} from 'react-router-dom'
import { docs,collection,getDocs,doc,getDoc} from "firebase/firestore";
import { Container,Button } from 'react-bootstrap';
import SideBarManager from "./sideBarManager"
import SideBarFinance from './sideBarFinance';
export default function FinanceUserProfile() {
    let params = useParams(); // Unpacking and retrieve id
    const db=firebase.firestore();
    const userRef=doc(db,'Employees',params.id)
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

    function HandleSuspend(id){
        var claimRef = db.collection("Employees").doc(id); // need to pass doc.id to do this
        return claimRef.update({
        status: "suspended"
        })
        .then(() => {
        console.log("Document successfully updated!");
        alert("User Suspended Successfully");
        })
    }
    function HandleUnblock(id){
        var claimRef = db.collection("Employees").doc(id); // need to pass doc.id to do this
        return claimRef.update({
        status: "active"
        })
        .then(() => {
        console.log("Document successfully updated!");
        alert("User Unblocked Successfully");
        })
    }
    function fetchClaims(){ // to fetch pending claims
        var totCl=0
        var totCLA=0
        var apprCl=0
        var apprCLA=0
        var verCl=0
        var verCLA=0
        db.collection("Claims").where("userid", "==", params.id).orderBy("createdAt","desc")
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
                <div className='col'><Link className="btn-light border rounded" to={`/Claim/${data.id}`}>View Claim</Link> </div>
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
                    <div className='col-4' style={{paddingLeft:'0',paddingRight:'0'}}><img className='rounded' src={Image} style={{height:'200px'}}></img>
                    </div>
                    <div className='col text-right ' style={{textAlign:"left",}}>
                        <div className='row border rounded'>
                            <div className='row' style={{paddingLeft:'0'}}>
                                <div className='col-8'>
                                <h3 style={{paddingLeft:'0'}}>{user.forename} {user.surname}</h3>
                                </div>
                                <div className='col' style={{textAlign:'right'}}>
                                <p style={{margin:'0',padding:'0'}}>{user.email}</p>
                                </div>
                            
                            </div>
                            <div className='row'>
                                <div className='col'>
                            <p style={{margin:'0',padding:'0'}}>Phone Number: +447882291356</p>
                            </div>
                            <div className='col'><p style={{margin:'0',padding:'0',textAlign:'right'}}>Account creation date {submitDate}</p></div>
                            
                            </div>
                            </div>
                            <br></br>
                            <div className='row'>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Claims Subbmited</p>
                                <h5>{totClaims}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Approved Claims</p>
                                <h5>{totApproved}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Reimbused Claims</p>
                                <h5> {totVerified}</h5>
                            </div>
                            </div>
                            </div>
                            <br></br>
                            <div className='row'>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Claims Total</p>
                                <h5>£{totCLaimA}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Approved Total</p>
                                <h5>£{totAPPA}</h5>
                            </div>
                            </div>
                            <div className='col border rounded' style={{textAlign:'center'}}>
                            <div>
                                <p>Reimbused Total</p>
                                <h5> £{totVA}</h5>
                            </div>
                            </div>
                            </div>

                            <br></br>
                        <div className='row'>
                            <div className="col" style={{paddingLeft:'0'}}>
                            <Button style={{color:"white",textAlign:'center'}} variant="success" onClick={()=>{HandleUnblock(params.id)}}>Unblock User</Button>
                            </div>
                            <div className='col-4'></div>
                            <div className='col' style={{textAlign:"right", paddingRight:'0'}}>
                                <Button style={{color:"white",}} variant="danger" onClick={()=>{HandleSuspend(params.id)}}>Suspend User</Button>
                                </div>
                        
                        </div>
                    </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <h3>{user.forename}'s Claims</h3>
                    </div>
                    <div className='row'>
                    <div className='row'>
                <div className='col-2 border rounded'>Title</div>
                <div className='col-2 border rounded'>Total</div>
                <div className='col-2 border rounded'>Approval Status</div>
                <div className='col-2 border rounded'>Reimbursement Status</div>
                <div className='col-2 border rounded'>Submittion Date</div>
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
        <div className='border-bottom'><h2>User Profile</h2></div>
        <Container className='border rounded' style={{paddingLeft:'5%',paddingRight:'5%'}}>
        {Display()}
        </Container>
        </div>
        </div>
    </div>
  )
}