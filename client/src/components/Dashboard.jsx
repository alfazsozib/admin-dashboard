import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Dashboard() {
  const [values, setValues] = useState()
  const [alldata, setData] = useState(null)
  const valueHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value })
  }

  function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    do {
      password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
    } while (!isPasswordUnique(password));
    return password;
  }

  function isPasswordUnique(password) {
    return true;
  }



  const sendData = async () => {
    const randomPassword = generateRandomPassword(42);
    const sendData = await axios.post("http://149.28.238.50:8080/send-data", { name: values.name, date: values.date, password: randomPassword });
    console.log(sendData)

  }

  const getData = async () => {
    const data = await axios.get("http://149.28.238.50:8080/get-data")
    setData(data.data)
    console.log(data)

  }

  const deleteData = async (item) => {
    try {
      const res = await axios.post("http://149.28.238.50:8080/remove-data", { id: item._id });
      console.log(res);
    } catch (error) {
      console.error(error);
    }

  }

  // useEffect(() => {
  //   getData()
  // }, [])
  useEffect(()=>{
    getData()
  },[sendData,deleteData])

  return (
    <div className=''>
      <div className='erroPage bg-cyan-500'>
        <div>
          <h1 className='font-extrabold text-6xl text-white'>
            Welcome Admin
          </h1>
        </div>
        <div className='flex flex-col gap-10 mt-12'>
          <div className='p-10'>
            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='text-white text-lg font-semibold'>Name</label>
                <input type="text" onChange={valueHandler} name='name' className='px-4 text-black' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="date" className='text-white text-lg font-semibold'>Date</label>
                <input type="date" onChange={valueHandler} name='date' className='px-4 text-black' />
              </div>
            </div>
            <button onClick={sendData} className='bg-[#000000] text-white font-bold px-6 py-2 rounded-lg mt-6'>Submit</button>
          </div>

          <div className='edit--section w-[100%]'>
            <div className='w-[100%] h-80  p-6'>
              <div className='bg-[#141313af]  flex flex-col gap-2 p-4 rounded-lg' >
                {alldata ? alldata.map((item) =>
                  <div id='data--section' className='flex items-center border-b-[1px] border-yellow-600 justify-between text-white'>
                    <div>

                      <h3>{item.name}</h3>
                    </div>
                    <div>

                      <h3>{item.date}</h3>
                    </div>
                    <div>
                      <h3>{item.password}</h3>
                      {/* <h3>{`${item?.password.slice(0,9)}...${item?.password.slice(45,56)}`}</h3> */}
                    </div>
                    <div className=''>
                      <button onClick={() => { deleteData(item) }} className='rounded-lg hover:bg-red-700 hover:text-white font-semibold px-4'>Delete</button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard