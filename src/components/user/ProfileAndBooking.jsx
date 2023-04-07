import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';

function ProfileAndBooking() {

  const [aps, setAps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const user = useSelector(state => state.user);

  const token = localStorage.getItem('user');
  useEffect(() => {
    const getAps = async () => {
      try {
        const { data } = await axios.get(`/appointments?page=${currentPage}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          withCredentials: true,
        });
        setAps(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAps();
  }, [currentPage]);

  return (
    <div>
      <div className=' w-full bg-[#F3F5F9]'>
        <div className='container'>
          <div className='flex py-24 max-h-full space-x-2'>
            <div className='hidden sm:block bg-white shadow-sm w-full  basis-1/4 p-4 space-y-3 rounded-md sticky' >
              <div>
                <h1 className='font-semibold text-2xl font-roboto text-[#605555] uppercase'>{user.name}</h1>
                <p className='text-[#807d7d] font-mono font-semibold'>{user.mobile}</p>
              </div>
              <div className='buttons flex flex-col space-y-2 '>
                <button className='text-lg p-3 text-[#807d7d] focus:border-green-400 focus:text-[#605555] hover:text-[#605555] text-start'>MY APPOINTMENTS</button>
              </div>
            </div>
            <div className='bg-white p-4 space-y-5 '>
              <h1 className='font-semibold text-2xl font-roboto text-green-700 '>Appointments</h1>
              {aps?.appointments ? aps?.appointments.map(ap => (
                <div className='shadow rounded-lg' key={ap._id}>
                  <div className='flex flex-col md:flex-row justify-between rounded-lg p-1'>
                    <div className='flex space-x-2'>
                      <img src={ap.doctor.imageUrl} className="h-24 rounded-l-lg" alt="" />
                      <div className='pt-1'>
                        <h1 className='text-[#605555] text-lg uppercase'>{ap.doctor.name}</h1>
                        <p className='text-[#605555]'><span className='text-[#807d7d]'>Specialisation : </span>{ap.doctor.specialisation}</p>
                        <p className='text-[#605555]'><span className='text-[#807d7d]'>Place : </span>{ap.doctor.place}</p>
                      </div>
                    </div>
                    <div className="md:flex-grow md:pl-4">
                      <h1 className='text-[#605555] text-md uppercase'>{new Date(ap.timeSlot[0].start).toLocaleDateString([], { month: 'long', day: '2-digit' })}
                      </h1>
                      <p className='text-[#605555] '><span className='text-[#807d7d]'></span>{new Date(ap.timeSlot[0].start).toLocaleDateString([], { weekday: 'long' })}
                      </p>
                      <p className='text-[#605555]'><span className='text-[#807d7d]'></span>{new Date(ap.timeSlot[0].start).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })} - {new Date(ap.timeSlot[0].end).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
                    </div>
                    <div className='md:mr-3'>
                      <p className='text-[#605555] text-end'><span className='text-[#807d7d]'>RS : </span>₹{ap.doctor.fees}</p>
                      {/* <p className='text-white bg-red-500 hover:bg-red-600 text-center rounded-full cursor-pointer'>cancel</p> */}
                    </div>
                  </div>
                </div>
              )) : <h1>No appoinments to show.</h1>}
            </div>
          </div>

          {aps?.appointments &&
            <ReactPaginate
              pageCount={aps.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              containerClassName="flex flex-row justify-center items-center my-4"
              pageClassName="rounded-md bg-gray-200 hover:bg-gray-300 mx-2 px-3 py-2 cursor-pointer"
              pageLinkClassName="w-full h-full flex justify-center items-center"
              activeLinkClassName="bg-blue-500 text-white"
              previousClassName="rounded-md bg-gray-200 hover:bg-gray-300 mx-2 px-3 py-2 cursor-pointer"
              previousLinkClassName="w-full h-full flex justify-center items-center"
              nextClassName="rounded-md bg-gray-200 hover:bg-gray-300 mx-2 px-3 py-2 cursor-pointer"
              nextLinkClassName="w-full h-full flex justify-center items-center"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          }

        </div>
      </div>
    </div>
  )
}

export default ProfileAndBooking;
