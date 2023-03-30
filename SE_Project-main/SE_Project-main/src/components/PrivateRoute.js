import React from 'react'
import { useAuth } from '../context/AuthContext'
import {Navigate} from 'react-router-dom'
export  function UserOnly({children}) {
    const {currentUser}=useAuth()
   return currentUser? children:<Navigate to="/login"/>
}
export  function EmployeeOnly({children}) {
    const {currentUser}=useAuth()
   return currentUser? children:<Navigate to="/register"/>
}
