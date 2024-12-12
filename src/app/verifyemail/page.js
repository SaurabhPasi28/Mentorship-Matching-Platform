// 'use client'
// import axios from 'axios'
// import { verify } from 'jsonwebtoken'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// // import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// export default  function VerifyEmailPage() {
//     const [token , setToken]=useState("")
//     const [error, setError]=useState(false)
//     const [verified, setVerified]=useState(false)

//     const verifyUserEmail = async()=>{
//         const router= useRouter
//         try {
//             await axios.post("/api/users/verifymail",{token}) 
//             setVerified(true);
//             setError(false)
//         } catch (error) {
//             setError(true);
//             console.log(error.response.data);
//         }
//     }

//     useEffect(()=>{
//         setError(false)
//         const urlToken=window.location.search.split("=")[1]
//         setToken(urlToken || "");

//         // const {query}= router
//         // const urlTokenTwo=query.token
//     },[])

//     useEffect(()=>{
//         setError(false)
//         if(token.length>0){
//             verifyUserEmail()
//         }
//     },[token])
//   return (
//     <div className='flex'>
//        <h1 className='text-4xl'> Verify Email</h1>
//        <h1 className='text'>
//         {token ? `${token}`: "No token"}
//        </h1>
//        {verified && (
//         <div> 
//             <h2>Verified</h2>
//             <Link href="/login"> Login</Link>
//         </div>
//        )}
//        {error && (
//         <div>
//             <h2>Error</h2>
             
//         </div>
//        )
//        }

//     </div>   

//   )
// }



'use client'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [error, setError] = useState(null)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Function to verify email
  const verifyUserEmail = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/verifymail", { token })
      setVerified(true)
      setError(null) // Clear previous errors if successful
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during email verification.")
      setVerified(false)
    } finally {
      setLoading(false)
    }
  }

  // Extract token from URL using Next.js useRouter hook
  useEffect(() => {
    const { token } = router.query
    if (token) {
      setToken(token)
    }
  }, [router.query])

  // Trigger email verification when token is set
  useEffect(() => {
    if (token) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl mb-4'>Verify Email</h1>

      {loading && <p>Verifying...</p>}

      {verified && (
        <div>
          <h2>Your email has been verified!</h2>
          <Link href="/login" className="text-blue-500">Login</Link>
        </div>
      )}

      {error && !verified && (
        <div>
          <h2 className="text-red-500">Error: {error}</h2>
          <Link href="/login" className="text-blue-500">Go back to Login</Link>
        </div>
      )}

      {!verified && !error && token && (
        <h2>Verifying your email with token: {token}</h2>
      )}

      {!token && !loading && !verified && (
        <p>No token found in the URL. Please try again.</p>
      )}
    </div>
  )
}
