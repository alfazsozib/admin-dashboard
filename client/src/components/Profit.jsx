import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from "antd"
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';




function Profit() {
  return (
    <div className='h-screen bg-cyan-500 p-12'>
        <div className='text-white text-3xl font-bold pb-8'>
            <h1>PROFIT TABLE</h1>
        </div>

        <div className='grid grid-cols-4 gap-2'>
            <div className='flex flex-col gap-2'>
                <label className='text-white' htmlFor="metaTraderID">META TRADER ID</label>
                <input type="text" name="metaId" />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-white' htmlFor="key">KEY</label>
                <input type="text" name="key" />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-white' htmlFor="balance">BALANCE</label>
                <input type="text" name="balance" />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-white' htmlFor="profit">PROFIT</label>
                <input type="text" name="profit" />
            </div>
            <button className='px-6 text-white font-bold py-2 bg-[#121212]'>Submit</button>
        </div>

        <div className='pt-12'>
            <div id='data--section' className='flex items-center border-b-[1px] border-yellow-600 justify-between text-white'>
                <div>
                    <h3>ID</h3>
                </div>
                <div>
                    <h3>BLANCE</h3>
                </div>
                <div>
                    <h3>PROFIT</h3>
                </div>
                <div>
                    <h3>DATE</h3>
                </div>
                <div className=''>
                    <button onClick={() => ''} className='rounded-lg hover:bg-yellow-500 hover:text-white font-semibold px-4'>Edit</button>
                    <button onClick={() => ''} className='rounded-lg hover:bg-red-700 hover:text-white font-semibold px-4'>Delete</button>
                </div>
            </div>
        </div>

    </div>
    
    )
}

export default Profit