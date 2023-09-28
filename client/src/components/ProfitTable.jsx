
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from "antd"
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

import "./profit.css"


import { TablePagination } from '@mui/base';




function ProfitTable() {

    const getProfitData=async()=>{
        const data = await axios.get("http://localhost:8080/get-profit-table")
        setProfits(data.data);
    }

  return (
    <div className='h-[100%] bg-cyan-500 p-12'>

        <div className='bg-[#00000082] rounded-lg'>
            <table className='w-full rounded-lg'>
                <thead>
                <tr className='text-white rounded-lg'>
                    <th className='border-2 border-[#2bdede] text-[14px] p-[4px]'>ID</th>
                    <th className='border-2 border-[#2bdede] text-[14px] p-[4px]'>API BALANCE</th>
                    <th className='border-2 border-[#2bdede] text-[14px] p-[4px]'>PROFIT</th>
                    <th className='border-2 border-[#2bdede] text-[14px] p-[4px]'>DATE</th>
                    
                </tr>
                </thead>
                <tbody>
                {profits ? profits.map((user, index) => (
                    <tr key={index} className=''>
                    <td className='text-center text-white border-2 border-[#2bdede] p-[1px]'> {user._id}</td>
                    <td className='text-center text-white border-2 border-[#2bdede] p-[1px]'>{user.balance}</td>
                    <td className='text-center text-white border-2 border-[#2bdede] p-[1px]'>{user.profit}</td>
                    <td className='text-center text-white border-2 border-[#2bdede] p-[1px]'>{user.date}</td>
                    </tr>
                )): <p className='text-white text-lg'>Loading ....</p>}
                </tbody>
            </table>
            
        </div>
        </div>
  )
}

export default ProfitTable