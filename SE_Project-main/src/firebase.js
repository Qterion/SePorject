import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import'firebase/compat/firestore';
import {getFirestore} from "@firebase/firestore";
import { addDoc,collection } from 'firebase/firestore';
const app=firebase.initializeApp({
    apiKey: "AIzaSyAWcLvDJZYft3SN8a51YNM929G7bCyqxeo",
  authDomain: "test-37117.firebaseapp.com",
  projectId: "test-37117",
  storageBucket: "test-37117.appspot.com",
  messagingSenderId: "61101165014",
  appId: "1:61101165014:web:ef46de4554fa1b1a5e3c77"
})
export const dd=firebase.firestore()
export const db=getFirestore()
export const auth = app.auth();
export default app;
export const createUserDocument=async(user,additionalData)=>{
  if(!user) return;
  const firestore=firebase.firestore();
  const userRef=firestore.doc(`Employees/${user.uid}`);
  const snapshot=await userRef.get();
  if(!snapshot.exists){
    const{forename, surname}=additionalData;
    try{ 
        userRef.set({
          email:user.email,
          forename:forename,
          surname:surname,
          status:"active",
          createdAt:new Date()
        })
        console.log(userRef.email)
    }catch(error){
      console.log("cant create user", error)
    }
  }
}
export const createUser=async(user,name,surname,role,)=>{
  if(!user) return;
  const ref=collection(db,'Invite');
  const docRef=await addDoc(
    ref,{
      managerId:user.uid,
      name:name,
      surname:surname,
      email:'',
      role:role,
      status:"Available",
      createdAt:new Date()
    }
  ).then(()=>{
    console.log("Success")
  }).catch((error)=>{
    console.log(error)
  })
}
export const createUserClaim=async(user,title,description,total,currency,date)=>{
  if(!user) return;
  const ref=collection(db,'Claims');
  const docRef=await addDoc(
    ref,{
      userid:user.uid,
      title:title,
      description:description,
      total:total,
      currency:currency,
      date:date,
      createdAt:new Date(),
      approvalStatus:"pending",
      verificationStatus:"unverified",
      reimbursementStatus:"pending"
    }
  ).then(()=>{
    console.log("Success")
  }).catch((error)=>{
    console.log(error)
  })
}