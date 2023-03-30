import React,{ useEffect, useRef, useState }from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Link} from 'react-router-dom'
import { docs,collection,getDocs,doc,getDoc, QuerySnapshot} from "firebase/firestore";
import { Container,Button } from 'react-bootstrap';
import { dd} from '../firebase'
import CreateInvite from './createUser'
import { useAuth } from '../context/AuthContext'
import SideBarManager from './sideBarManager';
export default function Invite() {
  const {currentUser}=useAuth()
  console.log(currentUser.uid)
    const db=firebase.firestore()
    const[loading,setLoading]=useState(true)
    const[claimDate,setClaimDate]=useState("")
    const [allDocs, setAllDocs]=useState([]);
    const [keysTot,setKeysTot]=useState(0)
    const [availTot,setAvailTot]=useState(0)
    const [usedTot,setUsedTot]=useState(0)
    const[popup,setPopup]=useState(false)
    
    
    useEffect(() => {
      if(allDocs.length===0){
        fetchClaims()
      }
        
      }, [])
      function fetchClaims(){ // to fetch pending claims
        var keys=0
        var available=0
        var used=0
        const aa=db.collection("Invite").orderBy("createdAt","desc").onSnapshot((querySnapshot) => { // listens for changes in real time
            querySnapshot.forEach((doc) => {
                keys=keys+1
                setKeysTot(keys)
                var data = doc;
                setAllDocs(arr => [...arr, data]);
                if(doc.data().status==="Available"){
                    available=available+1
                    setAvailTot(available)
                }
                used=keys-available
                setUsedTot(used)
            });
        }) 
    }
    async function getManager(id){
      var userRef=doc(db,'Employees',id)
      getDoc(userRef).then((e)=>{
          console.log(e.data().forename)

    })
    }
    function Claims(){
      return(
      allDocs.map((data) => {
          console.log(`Index: {i}`);
          getManager(data.data().managerId)
          return(
              <>
              <div className='row'>
              <div className='col-3 border ' style={{borderLeftRadius:'5%'}}>{data.id}</div>
              <div className='col-2 border' >{data.data().role}</div>
              <div className='col-2 border '>{data.data().createdAt.toDate().toLocaleDateString("en-GB")}</div>
              <div className='col-2 border' >{data.data().status}</div>
              <div className='col-2 border' style={{borderRightRadius:'5%'}}>{data.data().email}</div>
              <div className='col'></div>
              </div>
              
              <div className='row'><br></br></div>
              </>
  )   
      }))
  }
    function Display(){
      if(allDocs===""){
          return <>Loading....</>
      }
      else{
          return(<>
          <br></br>
              <div className='row border-bottom'>
                  <div className='col text-right ' style={{textAlign:"left",}}>
                      <div className='row border-bottom'>
                          </div>
                          <br></br>
                          <div className='row'>
                          <div className='col border rounded' style={{textAlign:'center'}}>
                          <div>
                              <p>Total Keys</p>
                              <h5>{keysTot}</h5>
                          </div>
                          </div>
                          <div className='col border rounded' style={{textAlign:'center'}}>
                          <div>
                              <p>Avaliable Keys</p>
                              <h5>{availTot}</h5>
                          </div>
                          </div>
                          <div className='col border rounded' style={{textAlign:'center'}}>
                          <div>
                              <p>Used Keys</p>
                              <h5>{usedTot}</h5>
                          </div>
                          </div>
                          </div>
                          <br></br>
                          <br></br>
                      <div className='row'>
                          <div className='col-9'></div>
                          <div className='col' style={{textAlign:"right", paddingRight:'0'}}></div>
                      
                      </div>
                  </div>
                  <div className='row' style={{paddingLeft:'0'}}>
                              <div className='col-8'>
                              <CreateInvite/>
                              </div>
                              <div className='col' style={{textAlign:'right'}}>
                              <p style={{margin:'0',padding:'0'}}></p>
                              </div>
                          
                          </div>
                  </div>
                  
                  <br></br>
                  <div className='row'>
                      <h3>Invite List</h3>
                  </div>
                  <div className='row'>
                  <div className='row'>
              <div className='col-3 border rounded'>Key</div>
              <div className='col-2 border rounded'>Role</div>
              <div className='col-2 border rounded'>Creation Date</div>
              <div className='col-2 border rounded'>Status</div>
              <div className='col-2 border rounded'>Claimed By</div>
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
  return (
    <div>
        <div className='row'>
        <div className='col bg-dark' style={{height:'1000px'}}>
            <SideBarManager/>
        </div>
        <div className='col-10'>
        <div className='border-bottom'><h2>Invite Settings</h2></div>
        <Container className='border rounded' style={{paddingLeft:'5%',paddingRight:'5%'}}>
        {Display()}
        </Container>
        </div>
        </div>
    </div>
  )
}