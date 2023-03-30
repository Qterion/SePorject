import { dblClick } from '@testing-library/user-event/dist/click'
import React, {useContext, useEffect, useState } from 'react'
import {auth,createUserDocument} from "../firebase"
const AuthContext=React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState()
    
    const [loading,setLoading]=useState(true)
    async function signup(email, password,forename,surname){
      try{
        const {user}= await auth.createUserWithEmailAndPassword(email,password)
        createUserDocument(user,{forename,surname})
      }catch(error){
        console.log('error',error)
        return false
      }
    }
    async function signupv2(email, password,forename,surname){
      try{
        const {user}= await auth.createUserWithEmailAndPassword(email,password) 
        console.log(user)
        await createUserDocument(user,{forename,surname})
      }catch(error){
        console.log('error',error)
        return error
      }
    }
    function login(email,password){
      console.log(auth.signInWithEmailAndPassword(email,password))
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
      return auth.signOut()
    }
    useEffect(()=>{
        
        const unsubscribe=auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
            
        })
        return unsubscribe
    },[])
    if (loading){
      return <>Loading....</>
    }
    
    const value={

       currentUser,
       login,
       signup,
       logout,
       signupv2
       
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
