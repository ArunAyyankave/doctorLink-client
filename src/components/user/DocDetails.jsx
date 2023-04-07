import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../api/axios";
import { LocationIcon, } from '../../assets/LocationIcon';

function SingleVenuejsx() {

  const [doc, setDoc] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDoc = async () => {
      try {
        const { data } = await axios.get(`/doctorDetails/${id}`);
        setDoc(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDoc();
  }, []);

  return (
    <div>
      <div className='bg-white '>
        <div className='container '>
          <div className='flex flex-col md:flex-row w-full mt-32 '>
            <div className='basis-2/5'>
              <div>
                <img src={doc.imageUrl} alt="" className='h-80 w-full object-full rounded-xl shadow-md ' />
              </div>
            </div>
            <div className='basis-3/5 container my-2 space-y-16'>
              <div className='flex justify-between'>
                <h1 className='font-bold text-2xl text-roboto'>{doc.name}</h1>
                <div className='text-xl mt-1'>
                  <div className='float-right mt-3'>
                    <h1 className='text-lg'>{doc.experience} of experience</h1>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-start'>
                  <div className='text-xl mt-1 text-cyan-500'>
                    <LocationIcon />
                  </div>
                  <div className='text-slate-500 ml-1 text-base'>
                    <p>{doc.facility},</p>
                    <p>{doc.place},</p>
                    <p>Kerala</p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <div className='flex text-4xl text-[#4f4141e2] space-x-6'>
                    {doc.specialisation}
                  </div>
                </div>
                <div className='border-white rounded-md border-dotted p-1 border-2'>
                  <div className='flex items-center space-x-1'>
                    <div className='text-2xl text-white'>
                    </div>
                    <h1 className='text-xl'>₹{doc.fees} Per Appoinment</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/5'>
            <div className='flex space-x-28 pt-12 justify-center '>
              <div className='text-cyan-500 cursor-pointer '>
                <h1 className=''>BOOK A SLOT</h1>
                <hr className='mt-3 border-2 border-cyan-500 rounded-t-lg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleVenuejsx;