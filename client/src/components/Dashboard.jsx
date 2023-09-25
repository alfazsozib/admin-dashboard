import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from "antd"
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
  
  const [values, setValues] = useState()
  const [alldata, setData] = useState(null)
  const [file, setFile] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  let initialValue = {
    name: '',
    date: '',
    password: '',
    email: '',
    metaID: '',
    affiliateName: '',
    affiliatePercentage: '',
    ourFee: '',
    phone:'',
    address:''

  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    getData()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
    const sendData = await axios.post("http://149.28.238.50:8080/send-data", { name: values.name, date: values.date, password: randomPassword, email: values.email, metaID: values.metaID, affiliateName: values.affiliateName, affiliatePercentage: values.affiliatePercentage, ourFee: values.ourFee, address: values.address, phone: values.phone });
    getData()
    if (sendData) {
      toast.success("Data Saved. Please Check Email....");
      setValues(initialValue)
    } else {
      toast.error("Not Saved")
    }
  }


  
  const getData = async () => {
    const data = await axios.get("http://149.28.238.50:8080/get-user-data")
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
    getData()
  }



  const editData = async (item) => {
    try {
      const res = await axios.post("http://149.28.238.50:8080/edit-data", { id: item._id, name: values.name, date: values.date, email: values.email, metaID: values.metaID, affiliateName: values.affiliateName, affiliatePercentage: values.affiliatePercentage, ourFee: values.ourFee, address: values.address, phone: values.phone });
      
      if (res) return toast.success("Data Saved!")
    } catch (error) {
      console.error(error);
    }
    setValues(initialValue)
  }



  const handleJson = (event) => {
    const name = event.target.name
    setFile({ ...file, [name]: event.target.files[0] });
  }

  const postJson1Data = async () => {

    const formData = new FormData();
    formData.append("json1", file.json1);
    console.log(formData)
    try {
      const data = await axios.post("http://149.28.238.50:8080/save-1", formData);

    } catch (error) {
      console.log(error);
    }
  }

  const postJson2Data = async () => {
    const formData = new FormData();
    formData.append("json2", file.json2);
    console.log(formData)
    try {
      const data = await axios.post("http://149.28.238.50:8080/save-2", formData);
    } catch (error) {
      console.log(error);
    }

  }

  const postJson3Data = async () => {
    const formData = new FormData();
    formData.append("json3", file.json3);
    console.log(formData)
    try {
      const data = await axios.post("http://149.28.238.50:8080/save-3", formData);
    } catch (error) {
      console.log(error);
    }

  }

  const postJson4Data = async () => {
    const formData = new FormData();
    formData.append("json4", file.json4);
    console.log(formData)
    try {
      const data = await axios.post("http://149.28.238.50:8080/save-4", formData);
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className=''>
      <Toaster />
      <div className='erroPage bg-cyan-500 pb-10'>
        <div>
          <h1 className='p-6 font-extrabold text-6xl text-white'>
            Welcome Admin
          </h1>
        </div>
        <div className='flex flex-col gap-10 mt-12'>
          <div className='flex'>
            <div className='p-10'>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name" className='text-white text-lg font-semibold'>Name</label>
                  <input type="text" required onChange={valueHandler} name='name' className='px-4 text-black' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="date" className='text-white text-lg font-semibold'>Deadline</label>
                  <input type="date" required onChange={valueHandler} name='date' className='px-4 text-black' />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="email" className='text-white text-lg font-semibold'>Email</label>
                      <input type="email" required onChange={valueHandler} name='email' placeholder='example@gmail.com' className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="metaID" className='text-white text-lg font-semibold'>Meta ID</label>
                      <input type="text" onChange={valueHandler} name='metaID' placeholder='123435...' required className='px-4 text-black' />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="affiliateName" className='text-white text-lg font-semibold'>Affiliate Name</label>
                      <input type="text" onChange={valueHandler} name='affiliateName' placeholder='ex: jhon' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="affiliatePercentage" className='text-white text-lg font-semibold'>Affiliate Percentage</label>
                      <input type="number" onChange={valueHandler} name='affiliatePercentage' required placeholder='2...' className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Our Fee</label>
                      <input type="text" onChange={valueHandler} name='ourFee' placeholder='10....' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Address</label>
                      <input type="text" onChange={valueHandler} name='address' placeholder='ex: street, zip, city' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Phone</label>
                      <input type="text" onChange={valueHandler} name='phone' placeholder='+1 348234....' required className='px-4 text-black' />
                    </div>
                   
              </div>
              <button onClick={sendData} className='bg-[#000000] text-white font-bold px-6 py-2 rounded-lg mt-6'>Submit</button>
            </div>

            <div className=''>

              <div className=''>
                <div className='flex'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white text-lg font-semibold'>Upload Json-1</label>
                    <input type="file" onChange={handleJson} name='json1' className='text-black' />
                  </div>
                  <button onClick={postJson1Data} className='bg-[#000000] text-white font-bold px-2 py-1 rounded-lg mt-6'>Submit</button>
                </div>
              </div>

              <div className=''>
                <div className='flex'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white text-lg font-semibold'>Upload Json-2</label>
                    <input type="file" onChange={handleJson} name='json2' className=' text-black' />
                  </div>
                  <button onClick={postJson2Data} className='bg-[#000000] text-white font-bold px-2 py-1 rounded-lg mt-6'>Submit</button>
                </div>
              </div>
              <div className=''>
                <div className='flex'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white text-lg font-semibold'>Upload Json-3</label>
                    <input type="file" onChange={handleJson} name='json3' className=' text-black' />
                  </div>
                  <button onClick={postJson3Data} className='bg-[#000000] text-white font-bold px-2 py-1 rounded-lg mt-6'>Submit</button>
                </div>
              </div>
              <div className=''>
                <div className='flex'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white text-lg font-semibold'>Upload Json-4</label>
                    <input type="file" onChange={handleJson} name='json4' className=' text-black' />
                  </div>
                  <button onClick={postJson4Data} className='bg-[#000000] text-white font-bold px-2 py-1 rounded-lg mt-6'>Submit</button>
                </div>
              </div>
            </div>
          </div>

          <div className='edit--section w-[100%]'>
            <div className='w-[100%] h-80  p-6'>
            <div style={{ maxHeight: alldata && alldata.length > 5 ? '300px' : 'auto', overflowY: 'auto' }}>
              <div className='bg-[#141313af] flex flex-col gap-2 p-4 rounded-lg'>
                {alldata ? alldata.map((item) =>
                  <>
                    <Modal
                      title="Edit Data And Save"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okButtonProps={{ disabled: false, danger: true }}
                      cancelButtonProps={{ disabled: false }}
                      bodyStyle={{ backgroundColor: "#0F464F" }}

                    >
                      <div className='p-10'>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-white text-lg font-semibold'>Name</label>
                            <input type="text" onChange={valueHandler} name='name' className='px-4 text-black' />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor="date" className='text-white text-lg font-semibold'>Date</label>
                            <input type="date" onChange={valueHandler} name='date' className='px-4 text-black' />
                          </div>
                          <div className='flex flex-col gap-2'>
                      <label htmlFor="email" className='text-white text-lg font-semibold'>Email</label>
                      <input type="email" required onChange={valueHandler} name='email' placeholder='example@gmail.com' className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="metaID" className='text-white text-lg font-semibold'>Meta ID</label>
                      <input type="text" onChange={valueHandler} name='metaID' placeholder='123435...' required className='px-4 text-black' />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="affiliateName" className='text-white text-lg font-semibold'>Affiliate Name</label>
                      <input type="text" onChange={valueHandler} name='affiliateName' placeholder='ex: jhon' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="affiliatePercentage" className='text-white text-lg font-semibold'>Affiliate Percentage</label>
                      <input type="number" onChange={valueHandler} name='affiliatePercentage' required placeholder='2...' className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Our Fee</label>
                      <input type="text" onChange={valueHandler} name='ourFee' placeholder='10....' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Address</label>
                      <input type="text" onChange={valueHandler} name='address' placeholder='ex: street, zip, city' required className='px-4 text-black' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="date" className='text-white text-lg font-semibold'>Phone</label>
                      <input type="text" onChange={valueHandler} name='phone' placeholder='+1 348234....' required className='px-4 text-black' />
                    </div>
                        </div>
                        <button onClick={() => editData(item)} className='bg-[#000000] text-white font-bold px-6 py-2 rounded-lg mt-6'>Submit</button>
                      </div>
                    </Modal>
                    </>
                ) : null}
                    <table>
                          <thead>
                            <tr className='text-white '>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>NAME</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>API KEY</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>DATE</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>AFFILIATE NAME</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>AFFILIATE PERCENTAGE</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>META ID</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>OUR FEE</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>Address</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>Phone</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>email</th>
                              <th className='border-2 border-[#41dbd5] text-[14px] p-[4px]'>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {alldata ? alldata.map((user, index) => (
                              <tr key={index} className=''>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'> {user.name}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.password}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.date}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.affiliateName}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.affiliatePercentage}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.metaID}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.ourFee}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.address}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.phone}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>{user.email}</td>
                                <td className='text-center text-white border-2 border-[#41dbd5] p-[1px]'>
                                <div className=''>
                                  <button onClick={() => { showModal() }} className='rounded-lg hover:bg-yellow-500 hover:text-white font-semibold px-4'>Edit</button>
                                  <button onClick={() => { deleteData(user) }} className='rounded-lg hover:bg-red-700 hover:text-white font-semibold px-4'>Delete</button>
                                </div>
                                </td>
                              </tr>
                            )): <p className='text-white text-lg'>Loading ....</p>}
                          </tbody>
                        </table>
                   
                
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard