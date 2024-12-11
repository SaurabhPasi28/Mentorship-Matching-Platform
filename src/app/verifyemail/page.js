'use client'
import axios from 'axios'
import { verify } from 'jsonwebtoken'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default  function VerifyEmailPage() {
    const [token , setToken]=useState("")
    const [error, setError]=useState(false)
    const [verified, setVerified]=useState(false)

    const verifyUserEmail = async()=>{
        const router= useRouter
        try {
            await axios.post("/api/users/verifymail",{token}) 
            setVerified(true);
            setError(false)
        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        setError(false)
        const urlToken=window.location.search.split("=")[1]
        setToken(urlToken || "");

        // const {query}= router
        // const urlTokenTwo=query.token
    },[])

    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])
  return (
    <div className='flex'>
       <h1 className='text-4xl'> Verify Email</h1>
       <h1 className='text'>
        {token ? `${token}`: "No token"}
       </h1>
       {verified && (
        <div> 
            <h2>Verified</h2>
            <Link href="/login"> Login</Link>
        </div>
       )}
       {error && (
        <div>
            <h2>Error</h2>
             
        </div>
       )
       }

    </div>   

  )
}

