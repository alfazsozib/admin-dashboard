import React from 'react'

function Error() {
  return (
    <div className='erroPage bg-cyan-500 flex justify-center items-center h-[100vh] '>
        <div>
            <h1 className='font-extrabold text-6xl text-white'>
                Only Admin Access The Page...
            </h1>
        </div>
    </div>
  )
}

export default Error