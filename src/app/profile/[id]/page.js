import React from 'react'

export default function RandomPage({params}) {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <h2 className='p-3 bg-green-400 rounded-lg text-black'>
            {params.id}
        </h2>
    </div>
  )
}
