import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../TokenContext/TokenContext'

export default function ProtectedRoute(props) {
  let {userToken} = useContext(UserContext)
  if(localStorage.getItem('usertoken') !== null){
    return props.children
  }else{
    return <Navigate to={'/login'}/>
  }
}
