import React, {useState} from 'react'
import {Button, Card, Form, ListGroup} from 'react-bootstrap'; 
import {db} from "../firebase";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import'firebase/compat/firestore';
import {getFirestore} from "@firebase/firestore";
import {addDoc,collection,doc } from 'firebase/firestore';
export default function Fetch(){
const [claims, setClaims]=useState([]);
 const [allDocs, setAllDocs]=useState([]); //for all claims
 const [id,setAllID]=useState([]);
 const [singleDoc, setSingleDoc]=useState({}); // for each claim searched - to do
 const db=firebase.firestore();

 function fetchClaims(e){ // to fetch pending claims
    e.preventDefault()
    db.collection("Claims").where("approvalStatus", "==", "pending")
    .onSnapshot((querySnapshot) => { // listens for changes in real time
        querySnapshot.forEach((doc) => {
            var data = doc;
            setAllDocs(arr => [...arr, data]);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
function handleApprove(id){
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
function Claims(){
    return(
    allDocs.map((data) => {
        console.log(`Index: {i}`);
        return(
            <div>
            <Card style={{ width: '18 rem'}}>
            <ListGroup variant="flush">
            <ListGroup.Item>{data.data().title}</ListGroup.Item>
            <ListGroup.Item>{data.data().description}</ListGroup.Item>
            <ListGroup.Item>{data.data().currency}</ListGroup.Item>
            <ListGroup.Item>{data.data().total}</ListGroup.Item>
            <ListGroup.Item>{data.id}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" onClick={()=>{handleApprove(data.id)}}>Approve Claim</Button>
            <Button variant="primary" onClick={()=>{handleDisapprove()}}>Disapprove Claim</Button>
            </Card>
            </div>
)
    }))
}
function handleDisapprove(e){
    e.preventDefault()
}

return(
    <div>
    <h1>Pending Claims</h1>
    <button onClick={fetchClaims}>Display pending claims</button>     
    {Claims()}
    
    </div>

)
}

