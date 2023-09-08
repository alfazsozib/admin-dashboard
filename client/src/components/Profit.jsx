import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from "antd"
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';




function Profit() {
    const [profits, setProfits] = useState('');

    const getProfitData=async()=>{
        const data = await axios.get("http://localhost:8080/get-profit-table")
        setProfits(data.data);
    }

    useEffect(()=>{
        getProfitData()
    },[])

    console.log(profits)
  return (
    <div className='h-screen bg-cyan-500 p-12'>
        <div className='text-white text-3xl font-bold pb-8'>
            <h1>PROFIT TABLE</h1>
        </div>

        {/* <div className='grid grid-cols-4 gap-2'>
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
        </div> */}

        <div className='pt-12'>
            {/* <div id='data--section' className='grid grid-cols-5 gap-10 items-center border-b-[1px] border-yellow-400 text-white'>
                <div>
                    <h3 className='font-extrabold'>ID</h3>
                </div>
                <div>
                    <h3 className='font-extrabold'>BLANCE</h3>
                </div>
                <div>
                    <h3 className='font-extrabold'>PROFIT</h3>
                </div>
                <div>
                    <h3 className='font-extrabold'>DATE</h3>
                </div>
                <div className=''>
                   <h3 className='font-extrabold'>Action</h3>
                </div>
            </div> */}
            
            <table className='w-96'>
                <tr className='flex gap-80'>
                    <th>ID</th>
                    <th>BALANCE</th>
                    <th>PROFIT</th>
                    <th>DATE</th>
                    <th className='ml-16'>ACTION</th>
                </tr>
                <tbody>
                    {profits? profits.map((item, index)=>
                    <tr className='flex pt-2 gap-[340px] text-white font-semibold'>
                        <td>{item.metaID}</td>
                        <td>{item.balance}</td>
                        <td className='ml-8'>{item.profit}</td>
                        <td>{item.date}</td>
                        <td className='flex gap-2'>
                            <button onClick={() => ''} className='rounded-lg bg-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold px-4'>Edit</button>
                            <button onClick={() => ''} className='rounded-lg bg-red-600 hover:bg-red-700 hover:text-white font-semibold px-4'>Delete</button>
                        </td>
                    </tr>
                    
                    ):null}
                </tbody>
            </table>

            <div id='data--section' className='pt-4 grid grid-cols-5 items-center  justify-between text-white'>
            {/* {profits ? profits.map((item, index)=>
            <>
                <div>
                    <h3>{item.metaID}</h3>
                </div>
                <div>
                    <h3>{item.balance}</h3>
                </div>
                <div>
                    <h3>{item.profit}</h3>
                </div>
                <div>
                    <h3>{item.date}</h3>
                </div>
                <div className=''>
                    <button onClick={() => ''} className='rounded-lg hover:bg-yellow-500 hover:text-white font-semibold px-4'>Edit</button>
                    <button onClick={() => ''} className='rounded-lg hover:bg-red-700 hover:text-white font-semibold px-4'>Delete</button>
                </div>
                </>
                ):<h1>Loading ....</h1>} */}
            </div>
        </div>

    </div>
    
    )
}

export default Profit